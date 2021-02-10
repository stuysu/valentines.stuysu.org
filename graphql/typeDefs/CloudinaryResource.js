import { gql } from 'apollo-server-micro';

export default gql`
    enum UrlPresets {
        thumbnailSmall
        thumbnailMedium
        previewLarge
    }

    type CloudinaryResource {
        id: String
        width: Int
        height: Int
        format: String
        resourceType: String
        createdAt: DateTime
        tags: [String!]!

        # Dynamic props
        url(preset: UrlPresets!): String
    }
`;
