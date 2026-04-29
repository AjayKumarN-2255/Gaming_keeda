import { gql } from "@apollo/client";
import client from "../../appollo/client.js";

const GET_ARCHIVE = gql`
  query GetArchive($first: Int = 50, $type: ContentTypeEnum!) {
    contentNodes(first: $first, where: { contentTypes: [$type] }) {
      nodes {
        __typename
        slug

        ... on NodeWithTitle {
          title
        }

        ... on NodeWithFeaturedImage {
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const fetchArchive = async (type, first = 50) => {
    try {
        const { data, errors } = await client.query({
            query: GET_ARCHIVE,
            variables: {
                type,
                first,
            },
            fetchPolicy: "network-only",
        });

        if (errors) {
            console.error("GraphQL Errors:", errors);
        }

        return data?.contentNodes?.nodes || [];
    } catch (error) {
        console.error("GraphQL Request Error:", error);
        return [];
    }
};

fetchArchive("IGK_CRICKET").then((posts) => {
    console.log("Fetched Posts:", posts);
}   );