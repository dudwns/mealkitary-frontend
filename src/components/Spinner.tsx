interface SpinnerProp {
  size?: number;
  color?: string;
  loading: boolean;
}

const Spinner = ({
  size = 24,
  color = '#919EAB',
  loading = true,
  ...props
}: SpinnerProp) => {
  const sizeStyle = {
    width: size,
    height: size,
  };
  return loading ? (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-black  opacity-80" />
      <div className="fixed z-40 inline-block align-middle transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <svg
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          style={sizeStyle}>
          <g
            fill="none"
            fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                stroke={color}
                strokeWidth="2">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle
                fill={color}
                cx="36"
                cy="18"
                r="1">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      </div>
    </>
  ) : null;
};

export default Spinner;
