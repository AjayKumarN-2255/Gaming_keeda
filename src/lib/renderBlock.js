import { colorMap } from "./colors.js";
import { fontSizeMap } from "./font.js";

function renderBlock(block) {
    const innerHtml =
        block.innerBlocks?.length > 0 ? renderBlocks(block.innerBlocks) : "";

    const extraClass = block.attributes?.className || "";

    const buildClass = (...classes) =>
        classes.filter(Boolean).join(" ").trim();

    // ---------------- TEXT ----------------

    switch (block.__typename) {

        case "CoreParagraph": {
            const content = block.attributes?.content || "";
            const textColor = block.attributes?.textColor;
            const bgColor = block.attributes?.backgroundColor;
            const fontSize = block.attributes?.fontSize;

            const className = buildClass(
                "wp-block-paragraph",
                colorMap[textColor],
                colorMap[bgColor],
                fontSizeMap[fontSize],
                extraClass
            );

            return `<p class="${className}">${content}</p>`;
        }

        case "CoreHeading": {
            const content = block.attributes?.content || "";
            const level = block.attributes?.level || 2;
            const textColor = block.attributes?.textColor;
            const bgColor = block.attributes?.backgroundColor;
            const fontSize = block.attributes?.fontSize;

            const className = buildClass(
                "wp-block-heading",
                colorMap[textColor],
                colorMap[bgColor],
                fontSizeMap[fontSize],
                extraClass
            );

            return `<h${level} class="${className}">${content}</h${level}>`;
        }

        case "CoreQuote": {
            const content = block.attributes?.content || "";
            const fontSize = block.attributes?.fontSize;

            const className = buildClass(
                "wp-block-quote",
                fontSizeMap[fontSize],
                extraClass
            );

            return `<blockquote class="${className}">${content}</blockquote>`;
        }

        case "CoreCode": {
            const content = block.attributes?.content || "";
            return `<pre class="wp-block-code ${extraClass}"><code>${content}</code></pre>`;
        }

        case "CorePreformatted": {
            const content = block.attributes?.content || "";
            return `<pre class="wp-block-preformatted ${extraClass}">${content}</pre>`;
        }

        // ---------------- MEDIA ----------------

        case "CoreImage": {
            const url = block.attributes?.url || "";
            const alt = block.attributes?.alt || "";
            const caption = block.attributes?.caption || "";

            return `
                <figure class="wp-block-image ${extraClass}">
                    <img src="${url}" alt="${alt}" />
                    ${caption ? `<figcaption>${caption}</figcaption>` : ""}
                </figure>
            `;
        }

        case "CoreEmbed": {
            const url = block.attributes?.url || "";
            return `
                <div class="wp-block-embed ${extraClass}">
                    <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>
                </div>
            `;
        }

        // ---------------- LAYOUT ----------------

        case "CoreGroup":
            return `<div class="wp-block-group ${extraClass}">${innerHtml}</div>`;

        case "CoreColumns":
            return `<div class="wp-block-columns ${extraClass}">${innerHtml}</div>`;

        case "CoreColumn":
            return `<div class="wp-block-column ${extraClass}">${innerHtml}</div>`;

        case "CoreCover": {
            const url = block.attributes?.url || "";
            return `
                <div class="wp-block-cover ${extraClass}" style="background-image:url(${url})">
                    ${innerHtml}
                </div>
            `;
        }

        // ---------------- LISTS ----------------

        case "CoreList":
            return `<ul class="wp-block-list ${extraClass}">${innerHtml}</ul>`;

        case "CoreListOrdered":
            return `<ol class="wp-block-list ${extraClass}">${innerHtml}</ol>`;

        case "CoreListItem": {
            const content = block.attributes?.content || "";
            return `<li>${content}</li>`;
        }

        // ---------------- UI ELEMENTS ----------------

        case "CoreButton": {
            const url = block.attributes?.url || "#";
            const text = block.attributes?.text || "Click";

            return `
                <a href="${url}" class="wp-block-button ${extraClass}">
                    ${text}
                </a>
            `;
        }

        case "CoreSeparator":
            return `<hr class="wp-block-separator ${extraClass}" />`;

        case "CoreSpacer": {
            const height = block.attributes?.height || 20;
            return `<div style="height:${height}px"></div>`;
        }

        // ---------------- CORE TABLE -----------------

        case "CoreTable": {
            const html = block.renderedHtml || "";
            return html;
        }

        // ---------------- DEFAULT ----------------

        default:
            return innerHtml;
    }
}


function renderBlocks(blocks) {
    if (!blocks) return "";
    return blocks.map(renderBlock).join("");
}

const data = [
    {
        "__typename": "CoreTable",
        "attributes": {
            "className": null,
            "hasFixedLayout": true,
            "caption": ""
        },
        "renderedHtml": "\n<figure class=\"wp-block-table test\"><table class=\"has-fixed-layout\"><tbody><tr><td>sfadasdfsadfsdf</td><td>fasfasdfsdf</td><td>fsfasdffs</td></tr><tr><td>fsdfsdfsdafsda</td><td>fasdfasdfasdfsadf</td><td>fsadfasdfasdfs</td></tr><tr><td>fsdfasdfsaf</td><td>fsdfsadffsf</td><td>fasdfasdfsdfasd</td></tr><tr><td>fsdfasf</td><td>fsadfafsadf</td><td>fsadfsdafsdf</td></tr><tr><td>fasdfasdfasdf</td><td>fsadfsdaffsdfasdf</td><td>afsdfdsfsdfdsfasf</td></tr></tbody></table></figure>\n",
    }
]
console.log(renderBlocks(data));