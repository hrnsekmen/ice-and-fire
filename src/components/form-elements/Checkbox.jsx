// eslint-disable-next-line react/prop-types
const Checkbox = ({ label, checked, onChange, name }) => {
  return (
    <label>
      <span className="checkmark"></span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
export default Checkbox;
