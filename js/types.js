import PropTypes from "prop-types";

// For shared type definition (no require cycles)
export default PropTypes.shape({
  body: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired
});
