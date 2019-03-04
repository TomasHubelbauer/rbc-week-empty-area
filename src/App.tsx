import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar, { Components, DateLocalizer } from 'react-big-calendar';
import moment from 'moment';

type AppProps = {};

type AppState = {
  view: 'month' | 'week';
};

type CalendarEvent = {
  start: Date;
  end: Date;
  title: string;
}

class EventComponent extends React.Component<any, never> {
  render() {
    // `.rbc-event-content`
    return this.props.title;
  }
}

class EventWrapperComponent extends React.Component<any, never> {
  render() {
    // `.rbc-event`
    return this.props.children;
  }
}

class EventContainerWrapperComponent extends React.Component<any, never> {
  render() {
    // `.rbc-events-container`
    return this.props.children;
  }
}

class DayWrapperComponent extends React.Component<any, never> {
  render() {
    // Uknown
    return this.props.children;
  }
}

class DateCellWrapperComponent extends React.Component<any, never> {
  render() {
    // `.rbc-day-bg`
    return this.props.children;
  }
}

class TimeSlotWrapperComponent extends React.Component<any, never> {
  render() {
    // `rbc-time-slot`
    return this.props.children;
  }
}

class TimeGutterWrapperComponent extends React.Component<any, never> {
  render() {
    // Unknown
    return this.props.children;
  }
}

class ToolbarComponent extends React.Component<any, never> {
  render() {
    return null;
  }
}

class HeaderComponent extends React.Component<any, never> {
  render() {
    // `.rbc-header`
    return null;
  }
}

class TimeGutterHeaderComponent extends React.Component<any, never> {
  render() {
    // `.rbc-time-header-gutter`
    return 'SUCCESS';
  }
}

export default class App extends React.Component<AppProps, AppState> {
  private static readonly localizer: DateLocalizer = BigCalendar.momentLocalizer(moment);
  private static readonly components: Components & any = {
    event: EventComponent,
    eventWrapper: EventWrapperComponent,
    eventContainerWrapper: EventContainerWrapperComponent,
    dayWrapper: DayWrapperComponent,
    dateCellWrapper: DateCellWrapperComponent,
    timeSlotWrapper: TimeSlotWrapperComponent,
    timeGutterWrapper: TimeGutterWrapperComponent,
    //toolbar: ToolbarComponent,
    header: HeaderComponent,
    timeGutterHeader: TimeGutterHeaderComponent,
  };

  public readonly state: AppState = { view: 'month' };
  
  render() {
    console.log('Render', this.state);
    const start = new Date()
    start.setHours(10, 0, 0, 0);
    const end = new Date();
    end.setHours(22, 0, 0, 0);
    return (
      <BigCalendar<CalendarEvent>
        localizer={App.localizer}
        components={App.components}
        events={[ { start, end, title: 'An event' } ]}
        view={this.state.view}
        onView={this.onCalendarView}
      />
    );
  }

  componentDidMount() {
    // https://github.com/intljusticemission/react-big-calendar/issues/1129
    // Switch to the week view only after the initial mount to work around the bug
    window.setTimeout(() => this.setState({ view: 'week' }), 0);
  }

  private readonly onCalendarView = (view: any) => this.setState({ view });
}
