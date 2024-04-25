import React from "react"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import MdxWrapper from "../components/mdxWrapper.js"
import { Container, SidebarLayout } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class iFrameEmbedTemplate extends React.Component {
  render() {
    console.log(this.props);
    const data = this.props.pageContext;

    return (
      <Layout containerWidth={containerWidth} excludeSearch footerBorder>
        <SEO  />
        <main id="docs-main" tabIndex="-1">
          <Container
            width={containerWidth}
            className="pds-spacing-mar-block-start-3xl"
          >

            <article className="pds-spacing-pad-block-end-xl">
              <div id="doc" className="doc changelog__content">
                <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">

                  <MdxWrapper mdx={data.body} />
                </div>
              </div>
            </article>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default iFrameEmbedTemplate

