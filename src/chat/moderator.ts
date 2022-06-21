import { ContentModeratorClient } from "@azure/cognitiveservices-contentmoderator";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { log, LogLevel, ModerationResult, ModerationRating } from "../common";

const explicitThreshold = 0.5
const offensiveThreshold = 0.9

export abstract class Moderator {

  private static contentModeratorKey = process.env["AZURE_CONTENT_MODERATOR_KEY"];
  private static contentModeratorEndPoint = process.env["AZURE_CONTENT_MODERATOR_ENDPOINT"];

  private static cognitiveServiceCredentials: CognitiveServicesCredentials;
  private static client: ContentModeratorClient;

  public static init(): void {
    this.cognitiveServiceCredentials = new CognitiveServicesCredentials(this.contentModeratorKey);
    this.client = new ContentModeratorClient(this.cognitiveServiceCredentials, this.contentModeratorEndPoint);
  }

  public static async review(message: string): Promise<ModerationResult> {
      
    const screeningOptions = {
      PII: true,
      classify: true,
      language: 'eng',
      // listId: this.termListId
    }

    const result = await this.client.textModeration
                                  .screenText(
                                      'text/plain', 
                                      message,
                                      screeningOptions);
    
    const category1 = result.classification?.category1?.score
    const category2 = result.classification?.category2?.score
    const category3 = result.classification?.category3?.score

    let rating = ModerationRating.Normal

    if (category3 > offensiveThreshold) {
      rating = ModerationRating.Offensive
    }
    
    if (result.terms && result.terms.length >= 3) {
      rating = ModerationRating.Offensive
    }

    if (category1 > explicitThreshold || category2 > explicitThreshold) {
      rating = ModerationRating.Explicit
    }

    if (rating !== ModerationRating.Normal) {                        
      log(LogLevel.Info, `MODERATION: (${rating}) (${category1}-${category2}-${category3}}) ${message}`)
    }

    const cleanMessage = result.autoCorrectedText || 
                         result.normalizedText || 
                         result.originalText

    return {
      rating,
      originalMessage: message,
      cleanMessage
    }  
  }
}