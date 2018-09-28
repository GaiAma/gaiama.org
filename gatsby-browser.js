export const shouldUpdateScroll = ({ prevRouterProps }) =>
  prevRouterProps && prevRouterProps.location ? `main-nav` : true
