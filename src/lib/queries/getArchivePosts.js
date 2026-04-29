import { gql } from "@apollo/client";
import client from "../../appollo/client.js";


const GET_ARCHIVE = gql`
  query GetArchive($uri: String!) {
    pageBy(uri: $uri) {
      title

      editorBlocks {
        __typename

        ... on CoreParagraph {
          attributes {
            fontSize
            content
            className
            textColor
            backgroundColor
          }
        }
      }
    }
  }
`;


export const fetchArchiveData = async (slug) => {
  const { data, errors } = await client.query({
    query: GET_ARCHIVE,
    variables: {
      uri: slug,
    },
    fetchPolicy: "network-only",
  });

  console.log("GraphQL Errors:", errors);

  return data?.pageBy || null;
};

// test
fetchArchiveData("cricket").then((data) => console.log(data));