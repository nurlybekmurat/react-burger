import PropTypes from 'prop-types';

export const Layout = ({children}) => {
  return (
    <main className='constructor pl-5 pr-5 container'>
      {children}
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
}