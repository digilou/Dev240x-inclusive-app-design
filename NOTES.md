# Notes from the course

## Applying Principles

### Page Structure

#### The DOM Order is Your Friend
* language attribute
* title element
* clear navigation
* logical tab order

#### Using Headings
* logical hierarcy of h1-h6

#### ARIA attributes
* Acronym: Accessible Rich Internet Applications
* Used with: AJAX, HTML, JavaScript
* Use: perfect for changing tree outlines, drag-and-drop, dynamic content
* Features: roles (type, structure), properties (state, live regions, drag/drop source & target), and keyboard navigation
* Docs: https://www.w3.org/WAI/intro/aria

#### Required HTML attributes
* `html lang="en-us"`
* `img alt=""`

#### Multiple Landmark Regions of the Same Type
Some duplicative use of landmark roles is possible. ARIA can enhance that experience:
* e.g. `nav aria-label="global navigation"`

#### More Required Attributes/Elements
* `label for="checkbox"` with `input id="checkbox"`
* `aria-label` or `aria-labelledby` should be used sparingly

#### CSS considerations
* font color (contrast, color coding)
* font size (mimicing semantic elements, use relative sizes >= 1em)
* text over images
* hiding content: `display:none`, `visibility:hidden`, `width: 1px`, `[hidden]`

#### Notifying Users (SPA)
* set the target of the focus to the `<h1>` tag of the element in the destination
* use a temporary element when you have a page that is a template and elements are loaded via Ajax
* use aria-live to announce the changes if the focus is not moved (e.g. during form submission)
* `tabindex="-1"` needs to be added to focus to a new view

#### Plan for Font Resizing Using Ems
As a front end web developer, it's important to be aware of how the text appears when it's zoomed, or enlarged. When the page is designed well, its text should stay proportional to all the other elements on the page. This is an important feature, especially for devices with small screens such as mobile phones or tablets.

[WebAIM font techniques](http://webaim.org/techniques/fonts)

