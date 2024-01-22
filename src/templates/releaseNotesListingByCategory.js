import React, { useState } from "react"
import { graphql } from "gatsby"
import debounce from "lodash.debounce"

import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/ReleaseNoteTeaser"
import { releaseNoteCategoryLoader } from "../data/releaseNoteCategories.js"
import ReleaseNoteCategorySelector from "../components/releaseNoteCategorySelector.js"

import { Container, FlexContainer } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

const ReleaseNotesListingByCategoryTemplate = ({ data, pageContext }) => {
  const allReleasenotes = data.allMdx.edges
  const categorySlug = pageContext.category
  const categoryData = releaseNoteCategoryLoader(categorySlug)

  const emptyQuery = ""

  // Set up state.
  const [filteredData, setFilteredData] = useState([])
  const [query, setQuery] = useState(emptyQuery)

  // Handle search input.
  const handleInputChange = (event) => {
    const query = event.target.value

    // Get all releasenotes.
    const releasenotes = data.allMdx.edges || []

    // Filter releasenotes based on query.
    const filteredData = releasenotes.filter((releasenote) => {
      const { title } = releasenote.node.frontmatter
      const { rawBody } = releasenote.node
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        rawBody.toLowerCase().includes(query.toLowerCase())
      )
    })

    // Update state based on query.
    setFilteredData(filteredData)
    setQuery(query)
  }

  // Debounce search input.
  const debouncedHandleInputChange = debounce(handleInputChange, 500)

  // If query is empty, show all releasenotes.
  const hasSearchResults = filteredData && query !== emptyQuery
  const releasenotes = hasSearchResults ? filteredData : allReleasenotes

  return (
    <Layout containerWidth={containerWidth} footerBorder>
      <SEO
        title="Pantheon Release Notes about {categoryDisplayName}"
        description="A filtering of changes to the Pantheon Platform by the category of {categoryDisplayName}"
        image={"assets/images/default-thumb-doc.png"}
      />
      <main id="docs-main" tabIndex="-1">
        <Container width={containerWidth}>
          <h1>
            Pantheon Release Notes: <em>{categoryData["displayName"]}</em>
          </h1>
          <FlexContainer
            style={{
              borderBottom: "1px solid var(--pds-color-border-default)",
              paddingBlockEnd: "var(--pds-spacing-3xl)",
              paddingBlockStart: "var(--pds-spacing-s)",
            }}
          >
            <div
              className="pds-input-field__input-wrapper"
              style={{
                flexGrow: "2",
              }}
            >
              <input
                type="text"
                aria-label="Filter release notes"
                placeholder={`Filter ${categoryData["displayName"]} release notes`}
                id="release-note-search"
                className="pds-input-field__input"
                onChange={debouncedHandleInputChange}
              />
            </div>
            <ReleaseNoteCategorySelector />
          </FlexContainer>

          <div id="doc" className="pds-spacing-mar-block-start-2xl">
            {releasenotes.map((releasenote, index) => (
              <ReleaseNoteTeaser
                key={index}
                ReleaseNoteData={releasenote.node}
                className="pds-spacing-mar-block-5xl"
              />
            ))}
          </div>
        </Container>
      </main>
    </Layout>
  )
}

export default ReleaseNotesListingByCategoryTemplate

export const pageQuery = graphql`
  query releasenotes($category: String!) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/releasenotes/" }
        frontmatter: { categories: { eq: $category } }
      }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          rawBody
          ...theReleaseNoteFields
        }
      }
    }
  }
`
