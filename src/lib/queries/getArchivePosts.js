import { gql } from "@apollo/client";
import client from "../../appollo/client.js";
import { PARAGRAPH } from "./blockFragments.js";

const BLOCK_ATTRIBUTES = gql`
  fragment BlockAttributes on EditorBlock {
    __typename
    ... on CoreParagraph {
      ...ParagraphBlock
    }
  }

  ${PARAGRAPH}
`;

const GET_ARCHIVE = gql`
  query GetArchive($uri: String!) {
    pageBy(uri: $uri) {
      title

      editorBlocks(flat: false) {
        __typename
        ...BlockAttributes

        innerBlocks {
          __typename
          ...BlockAttributes

          innerBlocks {
            __typename
            ...BlockAttributes
          }
        }
      }
    }
  }

  ${BLOCK_ATTRIBUTES}
`;

export const fetchArchiveData = async (slug) => {
  const { data, errors } = await client.query({
    query: GET_ARCHIVE,
    variables: {
      uri: slug, // no "/" needed anymore
    },
    fetchPolicy: "network-only",
  });

  console.log("GraphQL Errors:", errors);

  return data?.pageBy || null;
};

// test
fetchArchiveData("cricket").then((data) => console.log(data));