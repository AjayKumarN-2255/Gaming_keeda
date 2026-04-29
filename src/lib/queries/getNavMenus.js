import { gql } from "@apollo/client";
import client from "../../appollo/client.js";

export const fetchNavMenu = async (location = "primary") => {
  const GET_MENU = gql`
    query GetMenu($id: ID!, $idType: MenuNodeIdTypeEnum!) {
      menu(id: $id, idType: $idType) {
        menuItems(first: 100) {
          nodes {
            label
            path
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_MENU,
    variables: {
      id: location,
      idType: "LOCATION",
    },
    fetchPolicy: "fetch-first",
  });

  return data?.menu?.menuItems?.nodes || [];
};
