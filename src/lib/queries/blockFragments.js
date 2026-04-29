import { gql } from "@apollo/client";

export const PARAGRAPH = gql`
  fragment ParagraphBlock on CoreParagraph {
    attributes {
      fontSize
      content
      className
      textColor
      backgroundColor
    }
  }
`;

export const HEADING = gql`
  fragment HeadingBlock on CoreHeading {
    attributes {
      content
      level
      className
      textColor
      backgroundColor
    }
  }
`;

export const IMAGE = gql`
  fragment ImageBlock on CoreImage {
    attributes {
      url
      alt
      title
      caption
      className
    }
  }
`;

export const GROUP = gql`
  fragment GroupBlock on CoreGroup {
    attributes {
      className
      layout
    }
  }
`;

export const COLUMNS = gql`
  fragment ColumnsBlock on CoreColumns {
    attributes {
      className
      layout
    }
  }
`;

export const COLUMN = gql`
  fragment ColumnBlock on CoreColumn {
    attributes {
      className
      width
    }
  }
`;

export const TABLE = gql`
  fragment TableBlock on CoreTable {
    attributes {
      className
      hasFixedLayout
      caption
    }
    renderedHtml
  }
`;

export const AUTHOR_BIO = gql`
  fragment AuthorBioBlock on IgkAuthorBio {
    attributes {
      name
      role
      desc
      imgURL
      updated
    }
  }
`;

export const LINK_LIST = gql`
  fragment LinkListBlock on IgkLinkList {
    attributes {
      listTitle: title
      links
    }
  }
`;