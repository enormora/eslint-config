# Heading One

# Heading One

##No space after hashes

#### Skipped from h1 to h4

Bare URL: https://example.com inline.

Inline <div>html</div> tags are not allowed.

Text with * spaced emphasis *.

A *single-asterisk* run that dprint wants as underscores.

```
no language tag on this fence
```

    indented code block (markdown-preferences/prefer-fenced-code-blocks)

A self-destination link: [docs](violations.md).

> blockquote line one
continuation without `>` marker

[empty link]()

![](image-without-alt.png)

![]()

[missing label][undefined-label]

[invalid label reference][]

[link to nowhere](#does-not-exist)

(reversed)[https://example.com/reversed]

Label with whitespace: [ spaced label ][ref-with-space]

A direct link to a reference id: [text](existing-ref).

[same-def]: https://example.com/same
[same-def]: https://example.com/duplicate

[unused-def]: https://example.com/unused

[ref-with-space]: https://example.com/space
[existing-ref]: https://example.com/existing

| h1 | h2 |
| -- | -- |
| a  | b  | c |

[label-that-matches-url-pattern]: https://example.com/x
[label-that-matches-url-pattern](https://example.com/x)

## Duplicate heading

## Duplicate heading
