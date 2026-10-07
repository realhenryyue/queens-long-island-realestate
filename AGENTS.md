# Project architecture rules

- Keep the standalone English and Chinese mortgage planner documents as the source of the homepage mortgage section, embedded with a same-origin iframe so their interactive behavior and canonical pages stay intact.
- Share mortgage and contact links to their standalone documents on the canonical public origin, with preview metadata defined by those documents, so crawlers do not use homepage metadata; embedded WeChat sharing must open the standalone document at the top level.