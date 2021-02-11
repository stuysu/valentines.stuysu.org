import { gql } from 'apollo-server-micro';

export default gql`
    type RiskAnalysisScores {
        attack: Float
        threat: Float
        insult: Float
        sexuallyExplicit: Float
        toxicity: Float
    }

    type RiskAnalysis {
        id: ObjectId!
        isSafe: Boolean
        riskScores: RiskAnalysisScores
    }
`;
