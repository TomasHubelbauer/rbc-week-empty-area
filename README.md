# React Big Calendar Week View Empty Area

In this repository I explore ways of putting content in the empty are of the React Big Calendar
week view where the gutter column and the column header row meet in the top left corner of the
calendar.

First things first I will scaffold a TypeScript Create React App based application and install React
Big Calendar with its TypeScript typings which come from a separate DefinitelyTyped package:

RBC requires a localizer to use and we will also install Moment to use the Moment localizer with it.

```ps
npx create-react-app . --typescript
npm install react-big-calendar moment --save
npm install @types/react-big-calendar --save-dev
```

Next up I will scaffold the basic RBC demo and I will remove some of the CRA assets which I won't be
using. The RBC demo shows how to go about that in the Getting Started section:

http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro

It's also important to notice the GitHub landing page notice about stylesheets and import those, too:

https://github.com/intljusticemission/react-big-calendar#use-and-setup

`import 'react-big-calendar/lib/css/react-big-calendar.css';`

Setting the `defaultView` prop to `week` ensures the app is loaded to the week view so that we can
see the effect of the components immediately without having to switch. Another thing to do is to
seed the `events` property with hard-coded events so we can spot components that alter events and
thus are not so useful for our search of components which affect the chrome of the calendar.

After running the app now, it becomes apparent that RBC has a bug with the week day column headers
which slide off-screen and only return when switching to another view and back to view.

I have reported this as a supporting repro for this RBC issue I found when searching for this issue:

https://github.com/intljusticemission/react-big-calendar/issues/1129

We'll fix that by reading the current view from state and setting it to the `view` property after
the initial mount of the RBC component.

The React Big Calendar component has a few extensibility points in the form of the `components` prop
which are good first candidates. The RBC documentation is poor and outdated, but the TypeScript
typings package is fairly solid, so that's a good place to check out and see what values are
expected in this prop.

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-big-calendar/index.d.ts

Search for the `Components` interface.

We will go through these one by one and document what they affect:
Keep in mind this is in the week view and they may differ in other views.

**`event`**

Is the content underneath the time range line of the blue event area for each of the items in the
`events` prop. The returned contents gets shoved into a `rbc-event-content` `div`.

**`eventWrapper`**

Provides a `type` prop which is either `time` or `date`, in week it seems to be only `time`.
The provided child is `rbc-event` `div`.

**`eventContainerWrapper`**

Is the `rbc-events-container` `div`.

**`dayWrapper`**

I have not seen this component get instantiated in any view.

- [ ] Check the source code for where it is used

**`dateCellWrapper`**

Gets rendered for each day column in the week view and for each day cell in the month view.
Child is the `rbc-day-bg` `div` in both views.
In the week view these are in a `rbc-row-bg` container and ultimately in `rbc-time-header-content`.
This is getting close to the empty area we are after as it deals with the day column header cells,
but the empty area is excluded from this row, so not quite there yet.

This is the line underneath where the `header` component places its output.

**`timeSlotWrapper`**

Rendered for each of the time slots, which are incremented based on the `steps` property.
The child is a `.rbc-time-slot` div an these appear both in the time grid and in the time gutter.
The way to distinguish the two is by looking at the `resource` prop.
For the time gutter, the value of `resource` is `undefined`.
For the time grid, the value of `resource` is `null`.
The empty area where the week day column header row and the time gutter meet is not covered by these.

**`timeGutterWrapper`**

I have not seen this component instantiate in any of the calendar views.

- [ ] Check the source code to see where this is used

**`toolbar`**

This is the whole toobar container, which sits atop the calendar. The empty area
is not container within this container so no bueno still.

**`agenda`**

This is a compound object which has a few fields which override top level components for this view.

- `date`
- `time`
- `event`

**`day`**

This is a compound object which has a few fields which override top level components for this view.

- `header`
- `event`

**`week`**

This is a compound object which has a few fields which override top level components for this view.

- `header`
- `event`

**`month`**

This is a compound object which has a few fields which override top level components for this view.

- `header`
- `event`

**`header`**

This component can be used for changing the contents of the day column headers, but as opposed to
the `dateCellWrapper` wrapper component, this one appears line above the output of that one.

## Conclusion

The required component `timeGutterHeader` is present on the calendar but not captured in the typings.

- [ ] Contribute a PR for the RBC typings
