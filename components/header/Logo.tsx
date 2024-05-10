import React from "react";

function Logo({
    className
}: {
    className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      version="1.1"
      viewBox="0 0 556.742 558.525"
      className={className}
    >
      <g fill="#000" fillRule="evenodd" transform="translate(-19.313 -133.51)">
        <path d="M264.826 134.69c-78.734 9.883-148.078 51.227-194.528 116.124-12.847 17.789-30.142 52.05-36.895 72.969-26.52 80.71-15.154 170.808 30.307 241.142 55.344 85.487 153.02 133.912 254.32 126.336 23.883-1.812 39.366-4.777 61.602-11.53 123.7-37.885 206.058-158.95 195.516-287.92-3.294-40.026-11.365-69.51-28.99-104.76-38.049-76.427-108.711-130.947-192.386-148.407-22.236-4.612-67.862-6.588-88.946-3.953zm87.958 8.236c82.522 17.625 152.031 70.827 189.421 144.949 18.778 37.225 29.649 83.345 29.649 125.676-.165 91.252-47.108 178.88-122.712 228.789-108.218 71.321-252.343 57.485-343.265-32.944-17.954-17.953-24.213-25.366-36.567-43.978C15.45 484.543 8.53 377.149 51.686 290.674c40.025-80.38 115.135-135.89 203.257-150.22 22.896-3.623 75.604-2.47 97.84 2.472z"></path>
        <path d="M286.074 157.915c-.658.824 0 2.965 1.483 4.612 2.141 2.306 2.47 5.271 1.647 15.484-1.482 17.459-3.788 18.941-14.824 9.388-9.554-8.4-9.718-9.06-4.118-15.977 4.941-6.095 6.918-13.672 3.295-13.672-.989 0-3.954 1.648-6.754 3.46-3.788 2.8-5.27 3.129-6.259 1.482-1.482-2.306-13.836-1.153-18.119 1.647-2.141 1.482-1.976 1.976.824 4.118 5.6 4.117 14 12.683 14 14.165 0 .824-2.635 4.777-5.764 9.06-3.13 4.117-5.765 8.07-5.765 8.894 0 2.306 4.447 3.13 9.224 1.812 5.6-1.482 6.918-4.447 2.47-5.93-4.282-1.317-4.282-2.14-.164-7.412l3.13-4.117 4.117 3.953c3.295 3.13 3.789 4.447 2.306 6.26-2.964 3.623.494 5.929 6.095 3.788 2.47-.989 12.518-1.647 22.401-1.483 9.718 0 18.448-.33 19.437-.988.988-.494 1.812-2.635 1.812-4.612 0-3.46-.824-3.624-9.389-3.624h-9.553l-.494-5.765c-.494-5.765-.494-5.93 6.259-5.765 7.577.165 9.553-1.482 6.424-5.106-1.318-1.647-3.624-2.141-6.26-1.647-2.635.659-1.317-.659 3.46-3.13 14.165-7.577 12.188-10.706-7.248-10.706-7.248 0-13.177.823-13.672 1.812zm18.613 2.965c1.647.989.659 2.471-3.46 5.6-5.6 4.283-5.764 4.283-4.94.659.988-3.953 3.623-7.742 5.27-7.742.494 0 1.977.659 3.13 1.483zm-52.38 6.754c-3.294 2.14-7.082 2.14-5.764 0 .494-.989 2.635-1.648 4.612-1.648 2.965 0 3.13.33 1.153 1.648zm17.131.33c-.659 1.152-2.306 3.458-3.624 5.105-2.306 2.635-2.635 2.635-5.6.165-2.8-2.635-2.8-2.965 0-4.941 3.624-2.965 10.871-3.13 9.225-.33z"></path>
        <path d="M327.253 165.327c-4.448 4.777-7.248 15.648-6.095 23.39.824 6.423 5.93 11.86 11.036 11.86 2.141 0 4.941.493 6.424.987 3.788 1.483 11.86-7.576 14.165-15.483 2.306-8.564-.165-18.941-5.435-22.566-5.765-3.953-15.484-3.13-20.096 1.812zm16.965.989c3.295 3.294 2.306 4.612-5.765 8.07-4.117 1.813-8.73 4.448-9.883 6.095-2.306 2.636-2.306 2.636-1.482-.164.494-1.648.988-3.954.988-5.107 0-1.317 1.483-4.117 3.46-6.588 3.623-4.447 9.388-5.6 12.682-2.306zm1.318 20.095c-2.965 4.612-7.083 5.93-12.354 4.118-6.423-2.471-3.953-8.236 5.6-13.012l8.236-4.118.494 4.612c.33 2.635-.494 6.424-1.976 8.4z"></path>
        <path d="M215.247 171.092c-1.812.824-5.436 2.306-8.236 3.295l-4.941 1.647 3.624 2.8c3.788 2.965 11.2 25.366 9.718 29.319-1.812 4.612-7.248 2.306-13.507-5.93-3.459-4.612-6.918-8.235-7.577-8.235-.659 0 0-2.636 1.483-5.765 4.612-9.719 1.152-10.213-14.166-2.636-12.848 6.589-16.142 10.213-10.707 12.354 3.954 1.482 4.448 1.317 3.46-2.306-.495-1.812-.33-3.295.329-3.295.824 0 1.812 5.6 2.306 12.354 1.318 15.154 4.777 24.377 8.895 23.554 4.612-.824 4.447-6.095-.165-10.377l-4.448-4.118 3.46-6.424c1.811-3.623 3.953-6.918 4.611-7.412 2.471-1.482 12.025 13.836 11.036 17.295-1.317 4.118.824 3.954 10.377-.823 4.283-2.141 10.542-4.777 14-5.765 6.095-1.977 8.401-5.106 3.625-5.106-1.318 0-3.789-2.965-5.6-6.589-3.13-6.423-3.13-6.588 0-4.777 6.918 3.624 16.306-2.8 16.306-11.2 0-10.871-12.518-17.13-23.883-11.86zm14.495 8.566c2.141 6.588-.823 9.388-5.436 5.27-3.13-2.8-3.294-2.8-4.447.165-.988 2.8-1.317 2.636-2.306-.988-2.47-8.895-1.976-10.047 4.612-9.553 4.941.33 6.26 1.317 7.577 5.106zm-42.826 17.624c-2.47 4.447-5.106 8.236-5.765 8.236-.823 0-1.317-3.295-1.317-7.412 0-7.577 1.152-8.895 4.776-5.436 1.648 1.812 2.307 1.647 3.624-.824.989-1.482 1.977-2.8 2.471-2.8s-1.153 3.624-3.788 8.236z"></path>
        <path d="M363.49 181.14c-16.966 16.8-18.613 26.025-4.283 23.554 6.919-1.153 9.389-4.117 3.46-4.117-2.307 0-3.295-1.153-3.295-3.954 0-6.26 11.036-20.095 13.836-17.295.494.494 1.152 6.424 1.317 13.012.33 9.883 0 12.354-1.976 12.518-5.6.33-6.589.66-6.589 2.142 0 2.141 16.142 7.247 19.107 6.094 1.482-.494 1.976-1.812 1.318-2.964-.66-1.153-1.483-3.46-1.647-5.436-.165-1.812-1.153-9.554-2.142-17.295-.988-7.577-1.812-14.825-1.812-15.977 0-4.777-5.93-1.483-17.295 9.718zm17.79 27.837c-1.319 1.317-2.636 1.317-4.942 0-2.635-1.483-2.306-1.648 1.976-1.812 3.46 0 4.283.494 2.965 1.812z"></path>
        <path d="M404.998 187.399c-7.247 3.953-12.683 13.671-12.683 23.39 0 7.741.165 7.905 8.236 12.024 9.224 4.612 11.035 4.282 18.448-3.624 8.894-9.389 10.706-22.73 3.788-29.155-5.6-5.27-11.365-6.094-17.789-2.635zm14.495 3.953c6.095 4.448.824 8.73-9.553 7.577-1.648-.164-4.777.989-6.919 2.306-3.788 2.471-3.953 2.471-2.964-.165 1.647-5.106 9.224-12.024 12.848-12.024 1.976 0 4.94.989 6.588 2.306zm0 17.46c-3.459 6.753-9.224 9.388-14.824 6.918-4.777-2.141-5.436-7.082-1.483-10.377 2.965-2.47 17.625-4.612 18.448-2.8.33.659-.659 3.459-2.14 6.26z"></path>
        <path d="M437.611 203.87c.989 4.283 0 6.424-7.412 15.648-4.612 5.93-9.553 10.707-10.87 10.707-3.79 0-2.636 2.8 2.47 6.424 5.93 4.282 6.754 4.282 6.754.494 0-3.13 13.671-22.072 16.636-23.06.988-.33.659-1.812-.494-3.295-2.306-2.635-2.635-2.965 11.365 5.6l4.283 2.636-5.106 2.306c-2.965 1.152-5.271 3.294-5.271 4.776 0 3.954 3.953 2.965 8.894-2.305l4.612-4.777-3.788-3.624c-9.06-8.071-19.93-16.472-21.413-16.472-1.153 0-1.318 1.977-.659 4.942z"></path>
        <path d="M297.275 220.342c-1.977.824-4.777 3.953-6.095 7.083-1.153 3.13-4.612 7.247-7.412 9.224-4.283 2.965-5.106 4.777-5.106 10.047 0 4.942.988 7.083 4.282 9.718 7.412 5.93 15.319 3.789 14.166-3.623-.824-4.612 2.8-7.742 8.894-7.742 4.777 0 5.6.494 5.6 4.118 0 5.106-8.73 10.212-27.507 16.306-7.577 2.636-16.471 6.918-20.424 9.883l-6.754 5.436-11.365-2.8c-6.26-1.647-11.365-2.635-11.365-2.306 0 .494-1.483 0-3.295-.988-1.812-.989-3.294-3.295-3.294-5.271 0-3.295.164-3.295 2.964-.824 7.083 6.424 18.448 0 16.307-9.224-4.777-19.437-6.588-21.743-15.977-20.095-3.13.494-8.895.988-12.848.988-8.894-.165-15.154 5.6-15.154 14.166 0 10.541 5.271 15.483 9.554 8.73 3.13-4.942 5.27-3.954 5.27 2.47 0 12.354 5.93 17.79 23.06 20.425 9.225 1.482 13.013 3.623 13.178 6.918.164 4.612-7.577 15.648-16.637 24.213-15.318 14.33-26.025 18.283-34.096 12.518-1.976-1.318-3.623-3.624-3.623-4.942 0-2.8 6.094-3.13 6.918-.494.823 2.636 10.542-2.47 12.848-6.753 2.14-4.118.659-9.883-2.471-9.883-1.318 0-3.953-2.306-6.095-4.941-2.8-3.953-4.777-4.941-9.883-4.941-4.447 0-6.753.988-8.235 3.294-1.318 1.976-3.954 3.295-6.424 3.295-6.424 0-11.366 6.259-11.366 14.494 0 8.4 2.306 10.048 7.577 5.106 4.942-4.612 9.225-2.8 10.542 4.448 1.647 9.883 18.942 13.342 33.272 6.588 3.46-1.647 9.554-5.93 13.672-9.553 11.53-10.212 16.8-5.765 7.412 6.094-2.635 3.295-5.27 7.412-5.765 9.224-.659 1.648-6.424 6.919-13.177 11.53-18.283 12.519-22.071 23.39-11.53 32.614 6.095 5.27 11.2 6.26 22.072 4.117 5.106-1.152 5.27-1.152 4.118-8.235-1.153-8.565.988-12.19 7.412-12.19 5.6 0 8.4 2.8 8.4 8.565 0 4.777-6.259 12.025-20.26 23.225-5.106 4.118-9.553 9.883-12.848 16.472-2.8 5.6-5.435 10.542-5.764 10.871-.33.33-5.436-3.953-11.366-9.553-10.377-9.719-11.2-10.048-19.436-10.048-5.6 0-10.377 1.153-13.836 3.13-7.247 4.447-16.8 16.965-24.707 32.449-7.083 14-19.766 49.414-18.12 51.06.495.495 3.46-.987 6.424-3.294 3.13-2.306 9.225-5.765 13.507-7.741 8.236-3.624 8.4-3.624 5.106-14.33-.823-2.636-.494-3.624 1.153-3.624 1.482 0 3.295-2.965 4.612-7.083 2.635-9.224 9.389-22.401 13.672-27.178 6.918-7.412 12.683-2.964 16.8 13.177 2.636 10.048 11.366 19.437 18.12 19.437 2.964 0 4.117.823 4.117 3.13 0 1.812.33 4.282.988 5.6.659 1.647-1.317 2.964-7.082 4.447-12.683 3.459-27.178 10.87-34.92 18.283l-7.247 6.753.988 12.025c1.153 12.848 8.236 37.884 12.025 42.167 1.482 1.647 6.423 3.13 12.683 3.788 5.6.494 14.494 1.482 19.765 1.976 11.53 1.318 12.354-.988 2.471-6.094-3.953-1.977-9.388-6.095-12.189-9.224l-5.106-5.436-4.447 3.459c-5.6 4.447-9.225 2.141-6.424-3.954 1.482-3.13.988-4.612-2.141-8.565-2.471-3.13-3.954-7.082-3.954-11.035 0-7.412 4.612-10.542 24.378-16.801 17.46-5.436 27.672-5.765 29.319-.659.494 1.812 10.707 13.342 22.566 25.531 17.295 17.624 23.554 23.06 32.284 27.343 10.377 4.94 11.695 5.27 28.99 5.106 16.306-.165 20.424-.824 40.355-7.083 12.189-3.623 23.225-6.753 24.707-6.753 3.954 0 17.625-9.389 21.413-14.824 4.612-6.589 12.19-30.473 10.871-34.096-.988-2.306-2.306-.824-5.93 7.247-2.635 5.6-6.588 12.848-8.894 15.813-4.283 5.435-18.12 14.33-19.766 12.518-.494-.33.165-3.788 1.483-7.247 1.317-3.624 2.306-10.213 2.47-14.825 0-6.753 1.153-9.718 6.589-17.624 3.788-5.106 8.236-12.848 10.047-17.13l3.46-7.577-3.46-7.906c-1.976-4.613-3.458-11.53-3.458-16.307 0-8.236-.165-8.4-4.942-8.4-2.635 0-4.941-.495-4.941-1.154 0-.658 2.47-3.788 5.6-7.082l5.765-5.765-.988-16.965c-1.153-20.59-3.13-22.237-6.26-5.271-.659 3.13-3.294 9.718-6.094 14.66-2.8 4.94-5.93 11.859-7.248 15.482-2.306 6.424-2.141 6.754 4.283 18.448 3.623 6.589 6.588 13.342 6.588 14.99 0 2.8-9.718 8.894-14.33 8.894-.824 0-6.26-4.283-11.695-9.554-8.4-7.906-10.212-10.377-10.212-14.824 0-6.424-3.953-8.73-7.247-4.447-1.153 1.647-2.965 2.47-3.954 1.812-3.458-2.141-2.14-8.565 2.965-13.342l4.777-4.612-3.294-4.612c-1.812-2.47-5.106-8.73-7.412-13.672-2.306-5.106-4.613-9.224-4.942-9.224-.494 0-.658 5.765-.658 12.683.164 7.248-.824 16.801-2.306 21.743-2.965 10.87-2.142 13.506 8.73 25.53 5.105 5.6 8.894 11.695 10.047 15.978.988 3.623 1.647 6.918 1.317 7.247-.33.165-2.8.824-5.765 1.318-6.094 1.152-7.082-.494-7.082-11.86 0-8.4-3.295-13.342-8.895-13.342-1.647 0-5.106-2.306-7.577-4.94-2.47-2.8-6.094-4.942-7.906-4.942-7.082 0-16.965 12.848-14.494 18.942.658 1.976 2.47 2.306 7.577 1.482 5.27-.823 6.753-.494 7.576 1.812 1.813 4.612-1.647 8.236-7.412 7.906-6.423-.164-9.388-2.635-13.506-10.541-4.118-8.401-3.954-11.201 1.647-26.849 7.906-21.742 10.542-33.766 10.542-49.744.165-10.706-.66-16.636-2.635-20.919-3.295-6.918-2.636-9.224 4.282-13.506 5.6-3.624 16.966-17.625 18.283-22.73.659-2.966.165-3.13-7.742-2.142-4.777.659-13.506 2.8-19.436 4.777-12.518 4.282-13.836 1.976-2.471-4.612 17.46-10.212 46.779-11.86 62.756-3.789 16.8 8.565 37.226 29.32 48.261 49.085 9.389 16.801 16.801 40.026 16.801 53.038 0 8.895.494 11.2 2.471 11.2 1.318 0 2.47-1.482 2.47-3.294s.825-3.294 1.813-3.294c1.153 0 1.482-1.977.824-5.765-.824-4.447-.66-5.765 1.152-5.765 2.8 0 4.448 3.459 4.448 9.224 0 2.141.823 3.954 1.647 3.954.988 0 1.812-4.777 1.812-12.025 0-6.423 0-15.154.165-19.271 0-5.765-.824-7.906-4.118-10.871-2.306-1.977-5.27-3.954-6.424-4.448-1.647-.658-1.812-1.152 0-2.964.989-1.153 1.977-5.107 1.977-8.73v-6.589l4.612 4.283c5.436 5.27 11.86 7.906 19.436 7.906 4.448 0 6.095-.824 7.577-4.118 2.471-5.6 5.106-5.27 4.283.66-.659 4.281-.33 4.611 2.141 3.458 4.283-2.306 4.941-6.26 2.306-11.53-3.294-6.424-7.247-8.236-14.66-7.082-6.588.988-7.906 3.294-2.305 4.117 4.447.66 5.27 2.965 2.306 7.083-1.977 2.635-2.8 2.8-7.083.988-2.8-1.153-7.412-4.612-10.542-7.742-3.788-3.953-6.423-5.27-8.565-4.612-1.647.494-4.282-.165-5.765-1.482-1.482-1.318-4.447-2.965-6.423-3.459-3.13-.988-3.789-2.306-3.789-8.07 0-9.06-3.459-14.002-11.2-15.32-6.919-1.317-8.565-2.964-8.565-9.059 0-6.588-6.26-11.365-15.319-11.365-8.07 0-10.87-1.976-7.741-5.765 4.447-5.27 18.283-1.647 33.766 9.06 3.953 2.8 12.189 7.247 18.119 9.882 7.741 3.46 10.706 5.6 10.706 7.907 0 3.953 6.589 8.565 12.025 8.565 5.6 0 8.73-5.436 10.047-17.46 1.317-12.518.659-14.33-8.4-20.424-8.072-5.436-15.813-6.424-21.578-2.306-4.942 3.458-4.777 8.894.33 8.894 2.14 0 4.94 1.153 6.094 2.635 1.812 2.306 1.812 2.965-.824 4.777-4.777 3.624-12.189-.33-24.378-12.518-5.93-6.094-13.012-12.189-15.647-13.507-6.424-3.458-22.072-6.094-35.25-6.094-11.529 0-19.765-3.789-17.294-7.906 1.647-2.636 49.744-1.648 52.379.988 2.635 2.635 5.6 2.471 10.377-.659 4.447-2.8 5.6-10.047 2.306-13.342-1.318-1.317-1.483-3.294-.165-6.918 1.482-4.117 1.153-5.6-1.482-9.224-3.46-4.282-10.871-5.6-14.001-2.47-1.153 1.152-3.459.823-6.918-.99-9.06-4.447-20.095 2.472-20.095 12.684 0 8.07 2.306 11.036 6.588 8.4 4.447-2.8 11.53-2.635 11.53.33 0 3.295-5.436 4.777-11.86 3.459-2.8-.659-10.706-4.118-17.295-7.577-16.8-8.895-22.071-8.73-31.13.988-3.79 4.118-8.072 7.413-9.554 7.413-1.483 0-6.095 3.13-10.047 6.753-6.589 6.094-7.907 6.753-13.177 5.765-9.884-1.977-7.577-6.589 6.918-14 9.718-4.778 21.906-15.32 21.906-18.778 0-.989 3.295-4.777 7.248-8.565 9.553-8.895 11.036-14.001 5.27-19.766-3.788-3.788-5.27-4.282-10.706-3.295-5.106.824-7.082.33-9.388-2.14-3.954-4.118-8.73-5.436-13.342-3.624zm9.389 7.577c1.647 1.812 1.812 3.789.658 6.918-1.976 5.93-6.423 6.424-9.718 1.318-4.941-7.412 3.46-15.154 9.06-8.236zm19.106 3.624c2.8 1.976 3.789 6.423 1.813 8.4-2.8 2.8-9.06 2.142-11.036-1.317-2.636-5.271 4.117-10.542 9.224-7.083zm-33.272 9.388c1.318 3.624-2.141 12.354-4.777 11.366-3.459-1.318-4.282-5.271-2.141-9.718 1.976-4.613 5.436-5.436 6.918-1.648zm-55.344 4.448c3.13 3.13 2.306 6.094-2.141 8.235-3.459 1.483-4.777 1.483-6.753-.658-2.142-1.977-2.306-3.295-.824-6.095 2.141-3.788 6.589-4.612 9.718-1.482zm-16.471 4.612c.33 1.647-1.647 3.294-5.106 4.612-7.083 2.47-7.742 2.47-7.742-.33 0-6.423 11.695-10.212 12.848-4.282zm162.408 7.577c4.612 1.812 2.8 4.777-3.953 6.918-8.73 2.635-9.883 2.47-9.883-.989 0-5.765 6.753-8.73 13.836-5.93zm19.107 1.482c3.13 3.789.659 7.412-4.777 7.412-5.93 0-7.577-2.141-5.106-6.588 2.141-3.954 6.918-4.283 9.883-.824zm-160.761.659c.494.659-.165 2.635-1.318 4.282-2.635 3.789-7.577 2.142-7.577-2.47 0-2.471 1.153-3.295 3.953-3.295 2.307 0 4.448.659 4.942 1.482zm66.874 4.282c0 .494-7.083 4.118-15.648 8.071-12.518 5.93-15.648 8.071-16.636 11.695-1.318 4.941 2.306 9.883 8.565 11.365 7.082 1.812 2.47 4.777-6.095 3.954-9.883-.989-16.307-5.106-16.307-10.213 0-5.106 8.73-13.506 17.13-16.636 20.92-7.577 28.99-9.883 28.99-8.236zm41.343 9.225c3.953 2.14 3.789 2.14-2.8 3.458-4.941.989-7.247 2.636-8.73 5.6-4.612 10.048 3.295 15.484 22.402 15.484 17.295 0 38.378 6.423 38.378 11.53 0 .823-2.471.164-5.271-1.318-7.412-3.624-36.402-4.283-42.99-.824-4.448 2.141-4.942 2.141-8.565-1.812-5.271-5.6-11.53-6.918-18.12-3.788-5.105 2.47-5.6 2.47-10.87-1.483-2.965-2.141-6.424-3.953-7.577-3.953-2.965 0-2.635-4.118.33-6.589 2.14-1.812 3.458-1.482 7.576 1.483 6.26 4.612 7.577 3.788 3.13-1.812-2.8-3.789-2.965-4.448-.659-5.271 1.483-.494 4.118-.989 5.765-.989 1.977 0 2.8-.658 2.306-1.812-1.317-1.976 5.271-9.553 9.883-11.365 3.46-1.318 9.554 0 15.813 3.459zm53.697 2.47c1.317 3.624-1.812 6.095-5.93 4.777-3.788-1.153-4.612-4.941-1.318-6.26 3.789-1.647 6.26-1.152 7.248 1.483zM267.132 302.37c2.8 2.306 3.459 4.117 2.8 7.082-1.482 5.765-8.236 15.319-11.2 15.977-3.624.66-3.46-22.071.164-24.377 3.46-2.142 4.118-2.142 8.236 1.317zm39.532-.494c5.6 2.965 8.73 7.742 7.247 11.365-1.318 3.295-1.647 3.295-7.412-.823-10.707-7.577-23.39-4.283-28.99 7.576-1.482 3.13-3.789 5.765-4.941 5.765-2.471 0-2.8-3.623-.494-5.93.823-.823 2.141-4.447 2.965-8.07 1.152-5.765 2.14-6.918 8.565-9.389 9.224-3.459 16.965-3.623 23.06-.494zm-100.476 7.412c0 4.117-7.907 6.424-10.048 3.13-1.976-3.13-1.812-4.118 1.153-7.083 3.294-3.294 8.895-.824 8.895 3.953zm131.112.494c4.941 4.282 4.283 7.742-1.647 7.742-2.47 0-4.283-1.153-4.777-3.295-1.153-4.282-4.447-4.282-4.447 0 0 3.954-5.271 7.248-7.906 4.612-1.318-1.317-1.318-2.8 0-5.27 4.447-8.236 11.859-9.719 18.777-3.79zm-146.266 1.482c3.624 3.624 2.141 5.436-4.612 5.765-5.436.33-6.589-.165-6.589-2.635 0-4.777 7.413-6.918 11.201-3.13zm173.938 1.483c4.283 3.459 4.613 7.906.824 12.024-1.976 2.141-6.424-1.976-5.27-4.941.987-2.636-1.977-3.13-3.625-.66-1.317 2.142-6.918 2.142-8.235-.164-1.483-2.306 5.6-9.718 9.059-9.718 1.647 0 4.777 1.482 7.247 3.459zm-149.56 2.635c-.494 1.318-.989 2.8-.989 3.13 0 .33-1.152.659-2.47.659-3.46 0-5.107-4.941-2.471-6.589 3.13-1.976 6.918 0 5.93 2.8zm227.635-2.306c1.153 1.153 1.153 2.965.33 4.448-1.153 1.812-1.812 1.812-3.954.164-1.482-1.317-2.635-3.294-2.635-4.447 0-2.965 3.954-2.965 6.26-.165zm-139.513 4.448c4.447 2.47 3.953 5.765-1.153 8.07-3.623 1.483-5.106 1.483-8.236-.658-4.447-2.8-6.094-1.153-4.612 4.612 1.153 5.27-2.306 7.742-5.436 3.624-5.6-7.742.165-17.296 10.377-17.296 3.13 0 7.248.824 9.06 1.648zm151.043 7.741c.494 2.8-.33 3.788-2.635 3.788-3.954 0-7.577-4.117-6.095-6.588 1.977-3.13 8.236-1.153 8.73 2.8zm-66.38 4.612c4.777 4.612 4.942 5.6 1.977 9.883-3.295 4.283-6.589 1.647-5.436-4.282.988-5.436.659-5.6-3.953-2.8-2.636 1.647-3.789 1.647-5.93-.66-1.483-1.482-2.141-3.458-1.647-4.447 2.14-3.294 10.87-1.976 14.989 2.306zm-114.147 2.306c2.141 1.812 5.271 6.26 6.918 9.883 2.965 6.424 2.965 6.753 0 11.86-1.812 2.964-5.93 6.753-9.553 8.564-6.26 3.295-6.589 3.295-22.237.494-8.73-1.482-16.471-3.458-17.295-4.282-.823-.824.824-2.47 3.789-3.953 2.8-1.483 8.07-6.589 11.86-11.366 6.588-8.4 14.494-14.165 19.765-14.33 1.482 0 4.447 1.482 6.753 3.13zm177.233 4.777c.494 2.964-.165 3.623-3.624 3.623-5.106 0-6.918-2.635-4.117-5.93 2.8-3.458 7.082-2.14 7.741 2.307zm-133.09 4.941c0 1.812-9.883 11.036-14.33 13.342-6.094 3.13-10.706 2.306-10.047-1.812.823-5.765 24.377-16.8 24.377-11.53zm87.958 3.953c2.306.989 4.612 3.295 5.271 4.941.989 3.295-2.141 12.848-4.282 12.848-2.636 0-4.777-4.447-3.789-8.07.824-3.295.494-3.624-2.306-2.8-3.623 1.152-9.718-4.283-7.906-7.083 1.318-2.306 7.906-2.306 13.012.165zM293.816 363.15c4.612 5.271 6.26 10.048 8.07 22.73 1.318 10.378 1.154 15.155-.988 26.026-5.27 26.025-6.588 25.53-6.588-2.471v-25.202l-6.26-10.541c-3.294-5.6-5.764-11.036-5.106-11.86 1.483-2.47 8.236-1.647 10.871 1.318zm-59.627 2.965c2.636 3.295.989 7.083-4.117 9.06-2.306.823-4.118 2.635-4.118 4.117 0 3.295-3.13 3.13-6.918-.33-4.447-3.953-3.789-9.882 1.647-12.683 5.765-3.294 10.871-3.294 13.507-.164zm49.909 10.048c4.282 6.26 4.94 8.4 5.6 24.049.988 18.447-2.8 42.496-6.589 42.496-.988 0-5.27-3.295-9.388-7.412-9.06-9.06-17.625-12.024-33.437-11.695-6.095 0-11.036-.165-11.036-.659 0-3.13 12.848-18.941 22.236-27.177 7.742-6.918 12.19-12.519 14.99-18.613 3.458-7.906 4.282-8.73 8.4-8.236 3.13.33 5.93 2.635 9.224 7.247zm140.336-3.46c5.106 4.942 5.106 7.248.494 13.178-3.13 3.953-3.623 4.117-5.106 1.647-.988-1.812-.823-3.459.33-4.612 3.294-3.295 2.141-6.589-1.976-5.436-3.13.659-4.283 0-5.765-2.965-.989-2.14-1.318-4.447-.824-4.941 2.306-2.306 9.224-.659 12.848 3.13zm10.377 27.508c4.283 4.283.494 17.79-4.94 17.79-2.307 0-1.483-6.59 1.152-7.578 3.624-1.482 2.965-3.788-1.647-5.6-5.271-1.976-5.436-6.588-.33-6.588 2.141 0 4.612.823 5.765 1.976zm-240.977 12.848c1.153 0 6.424 3.788 11.53 8.565 8.895 8.07 9.224 8.73 8.236 14.33-1.483 8.236-5.271 16.637-7.248 16.637-.988 0-4.282-5.436-7.412-12.025-8.73-18.448-15.154-22.401-23.883-14.989-4.283 3.624-15.154 23.225-18.778 33.931-.659 1.648-2.306 2.965-3.788 2.965-3.624 0-2.142-5.6 5.106-20.59 8.894-18.447 23.389-31.789 31.79-29.483 1.317.33 3.294.659 4.447.659zm64.403 18.283c9.719 4.283 17.79 12.354 20.92 20.919 2.8 7.742 6.423 13.671 24.542 40.19 4.117 5.93 9.224 15.977 11.2 22.237 1.977 6.094 4.283 11.86 4.942 12.683.823.659 4.282-4.941 7.742-12.354 7.906-16.8 13.671-22.895 21.248-22.895 4.117 0 6.423 1.153 9.059 4.941 2.965 3.789 4.282 4.448 6.588 3.295 4.942-2.8 9.389-1.812 13.013 2.8 6.094 7.906 1.812 23.06-10.048 34.92-14 14-37.72 20.918-61.603 17.953-12.683-1.647-22.73-8.564-41.343-28.33-31.955-33.932-44.473-57.156-37.72-70.333 3.954-7.413.824-9.883-5.93-4.942-4.117 3.13-5.435 3.459-6.588 1.647-1.812-2.964-1.812-3.623.33-9.224 2.306-6.094 7.741-11.86 13.836-14.824 5.764-2.635 22.236-1.812 29.813 1.318zm61.604 28.66c3.459 4.283.823 7.412-5.271 6.26-7.412-1.318-7.742-1.977-3.13-5.6 4.612-3.789 5.765-3.789 8.4-.66zm43.32 10.377c7.247 7.412 7.906 8.4 5.93 11.695-3.624 5.6-6.26 5.436-10.213-1.153-3.459-5.436-9.388-18.777-9.388-21.084 0-1.812 6.26 2.965 13.671 10.542zm-29.32-1.317c2.471 2.635 2.471 3.623.824 5.765-2.635 3.13-9.224 3.294-10.377.164-.988-2.306 2.965-9.224 5.27-9.224.66 0 2.636 1.483 4.283 3.295zm-180.362 6.918c0 1.153-8.73 6.26-10.706 6.26-1.977 0-.494-5.6 2.8-10.213l3.459-4.941 2.14 3.788c1.154 2.141 2.142 4.447 2.307 5.106zm241.142 4.447c-2.47 4.612-6.095 9.718-8.071 11.695-3.624 3.294-3.624 3.294-10.542.33l-6.918-3.13 5.436-4.612c5.106-4.283 20.095-12.354 23.225-12.354.823 0-.66 3.624-3.13 8.071zm-174.433 2.8c1.318.659 3.624 3.13 4.942 5.6l2.47 4.612-8.73 2.142c-4.611.988-15.976 4.447-25.036 7.412s-16.965 4.941-17.624 4.612c-4.777-2.965 2.635-9.883 20.919-19.272 11.2-5.765 17.46-7.082 23.06-5.106zm114.477 1.318c0 1.153-.988 3.13-2.141 4.117-1.812 1.318-2.965 1.153-5.106-1.152-1.483-1.648-2.142-3.624-1.483-4.118 1.977-2.141 8.73-1.153 8.73 1.153zm-9.389 8.236l6.095 3.788-3.295 4.118c-1.812 2.306-4.117 6.423-5.106 8.894l-1.812 4.777-3.623-9.883c-2.471-6.588-3.295-10.87-2.306-12.848 1.812-3.623 2.47-3.459 10.047 1.153zm69.839 44.802c-2.47 2.141-8.4 4.941-13.012 6.424-9.883 2.8-12.848 3.13-12.848.823 0-2.306 4.941-4.447 13.012-5.435 3.953-.494 9.224-2.306 11.53-4.118 5.93-4.447 6.918-2.635 1.318 2.306z"></path>
        <path d="M256.261 342.56c-3.953 3.953-7.247 7.577-7.247 8.236 0 1.647 9.718 4.612 15.154 4.612 7.741 0 11.2-2.635 11.2-8.895 0-5.765-4.117-10.87-8.894-10.87-1.648 0-6.095 3.13-10.212 6.918zm13.342 2.965c0 1.647-1.976 2.635-5.271 2.965-5.765.494-6.753-.989-3.459-4.283 2.8-2.8 8.73-1.812 8.73 1.318z"></path>
        <path d="M123.007 226.93c-2.141 2.307-3.624 2.8-4.941 1.648-1.647-1.318-3.624-.33-7.577 3.294-5.106 4.777-5.436 5.271-2.8 7.248 2.635 1.976 2.635 2.306-1.153 5.93-4.941 4.611-3.788 6.918 2.965 6.259 4.447-.494 5.27.165 6.424 4.447 2.47 8.73 10.377 15.648 17.954 15.648 2.306 0 6.753-3.459 12.353-9.553 9.389-10.048 11.036-13.836 5.436-12.354-4.612 1.318-24.543-18.119-23.39-22.73 1.153-4.118-1.482-3.954-5.27.165zm-7.412 8.236c0 .824 1.647 1.648 3.788 1.648 2.142 0 5.6 1.812 7.578 3.953l3.623 3.953-6.588.66c-5.6.493-6.754 0-7.083-2.801-.33-1.812-1.317-3.13-2.306-2.965-.824.165-1.647-1.153-1.647-2.965 0-1.647.659-3.13 1.317-3.13.66 0 1.318.66 1.318 1.648zm-1.647 10.542c0 .494-.659 1.318-1.647 1.812-.824.494-1.648.165-1.648-.659 0-.988.824-1.812 1.647-1.812.989 0 1.648.33 1.648.66zm21.248 4.777c2.306.988 4.282 2.8 4.612 3.788.988 2.8-4.118 7.248-8.4 7.248-3.79 0-12.519-7.742-12.519-11.201 0-2.635 11.2-2.471 16.307.165z"></path>
        <path d="M469.401 226.272c-.494.494-.659 2.965-.33 5.6.66 4.118.165 4.777-4.282 5.765-2.8.659-7.247 2.965-9.883 5.27-3.953 3.295-4.941 5.437-4.941 10.543 0 5.765 1.153 7.906 8.4 15.648 4.777 4.94 9.225 8.894 9.883 8.894.824 0 1.483-1.812 1.483-3.953 0-5.436 17.13-22.401 22.566-22.401 5.106 0 4.777-1.648-1.647-7.907s-7.742-6.588-7.742-1.482c0 2.141-1.812 5.6-3.953 7.577L475 253.45l-.659-6.589c-.494-5.27 0-6.753 1.977-6.753 1.482 0 3.459-.824 4.612-1.977 1.482-1.482.824-3.13-3.295-7.412-5.27-5.436-6.588-6.26-8.235-4.447zm6.918 7.906c0 .494-.658 1.318-1.647 1.812-.823.494-1.647.165-1.647-.659 0-.988.824-1.812 1.647-1.812.989 0 1.647.33 1.647.659zm-4.941 13.013c0 11.365-7.412 18.612-11.53 11.2-2.635-5.106-1.977-8.4 3.13-13.506 6.588-6.589 8.4-6.095 8.4 2.306z"></path>
        <path d="M93.523 262.674c-4.282 6.094-4.118 9.718.165 8.07 1.317-.493 4.777.33 7.577 1.813l5.27 2.635-4.117 1.647c-2.306.824-5.27 2.141-6.918 2.965-1.977.989-2.965.33-3.624-2.8-1.482-5.6-5.106-4.941-9.06 1.976-4.282 7.083-4.282 8.895-.493 8.895 4.117 0 8.4-3.294 5.765-4.447-2.306-.824-2.965-3.789-.824-3.789.659 0 2.8 3.789 4.941 8.236 4.283 9.389 9.225 13.342 16.637 13.507 5.93.165 9.883-2.965 16.636-13.507 5.765-9.06 6.589-14.165 1.812-11.695-2.47 1.318-5.436.165-14.824-5.764-7.742-5.106-11.695-8.565-11.695-10.707 0-4.777-2.8-3.789-7.247 2.965zm21.084 19.107c2.47 1.812 2.8 2.8 1.152 5.764-3.788 7.083-15.977 5.93-20.095-1.647-1.317-2.47-.823-3.294 2.141-4.612 5.6-2.141 13.507-1.976 16.801.494z"></path>
        <path d="M497.732 259.709c0 1.812-2.306 4.612-5.6 6.588-8.895 5.6-10.047 12.519-3.294 19.437 4.282 4.118 4.282 4.447 1.317 6.588-1.812 1.318-4.777 1.977-6.753 1.648-5.436-.989-4.941 4.117 1.153 10.706 4.777 5.436 4.777 5.436 4.941 1.318 0-3.295 2.47-5.6 12.518-12.024 9.554-6.095 12.848-7.577 14.66-6.095 4.447 3.624 4.447-1.812.164-8.4-4.94-7.248-7.082-8.071-7.906-2.965-.33 1.976-2.14 4.777-4.282 6.094-3.13 1.977-3.789 2.141-3.295.165.33-1.482-.988-2.306-3.458-2.306-5.765 0-5.93-3.13-.66-7.247 2.966-2.471 5.766-3.295 8.236-2.636 4.613 1.153 4.777-.658.33-8.07-3.788-6.424-8.07-7.907-8.07-2.8z"></path>
        <path d="M70.793 300.228c-1.483 3.46-1.318 4.448 1.647 6.919 4.282 3.623 5.6 11.2 1.976 11.2-1.317 0-3.13-1.647-4.117-3.788-.824-1.977-2.142-3.624-2.8-3.624-1.648 0-7.907 12.354-7.907 15.648 0 3.294 6.424 3.294 11.366-.33 2.306-1.482 3.459-1.976 2.965-.988-.66.988 3.13 3.624 8.73 6.094 7.247 3.295 9.882 5.271 9.882 7.742 0 5.436 3.13 3.46 6.919-4.282 3.953-7.906 3.458-10.377-1.483-7.412-2.635 1.647-4.612 1.317-12.024-2.471-7.247-3.624-8.4-4.777-6.095-6.095 2.636-1.317 16.142.165 22.73 2.8 1.648.66 3.295-.823 5.272-5.106 3.459-6.918 2.635-8.4-2.635-6.094-2.8 1.317-6.095 1.317-11.695 0-5.765-1.318-8.565-1.318-10.871.164-2.635 1.648-3.295.989-5.106-6.259-2.306-9.224-3.953-10.212-6.753-4.118z"></path>
        <path d="M522.11 300.228c-3.13 6.095-23.39 15.319-27.672 12.683-5.106-3.13-4.942-.164.33 12.025 5.93 13.671 7.412 15.648 11.365 15.648 3.459 0 5.93-3.13 3.624-4.777-1.977-1.153-7.083-10.707-7.083-13.177 0-.824 2.635-2.965 5.93-4.942 3.13-1.976 5.435-2.8 4.94-1.976-.493.824.495 3.295 2.307 5.436 1.812 2.306 2.635 4.612 2.141 5.27-.494.495.165.99 1.812.99 3.624 0 4.942-3.79 2.636-8.072-1.483-2.8-.494-2.47 5.764 1.812 10.871 7.577 12.19 4.777 5.271-10.542-3.13-6.918-6.423-12.847-7.412-13.506-.988-.494-2.8.823-3.953 3.13zm8.565 12.519c2.635 4.612.988 5.6-5.106 3.13-4.777-2.142-4.942-2.307-2.141-4.448 3.953-2.965 5.106-2.8 7.247 1.318z"></path>
        <path d="M516.51 338.772c-4.447 1.976-7.412 4.777-8.895 8.235-5.106 12.684 5.6 31.79 14 24.872 2.142-1.647 1.813-2.47-1.646-5.27-3.295-2.472-4.118-4.778-4.118-10.213 0-8.4 4.777-13.836 13.671-15.318 4.777-.66 6.589-.165 10.048 3.294 4.777 4.777 5.765 11.036 1.647 11.036-1.647 0-2.47-1.318-2.306-3.788.659-6.26 0-7.742-2.635-7.742-1.812 0-2.471.988-1.812 3.13.494 1.976-.165 3.623-1.483 4.117-3.13 1.153-2.964 8.4.33 11.53 3.624 3.624 8.236 3.294 11.2-.989 5.93-8.4.495-21.412-10.047-24.212-8.4-2.306-10.047-2.306-17.954 1.317z"></path>
        <path d="M55.474 341.572c-8.4 13.012 2.471 28.66 19.93 28.66 6.424 0 8.401-.824 12.354-5.106 2.635-2.8 4.777-6.424 4.941-7.906 0-1.483.33-3.954.66-5.765.988-5.436-2.142-10.871-6.26-10.871-3.789 0-3.953.494-3.13 8.07.659 7.413.33 8.072-4.612 11.695-10.212 7.248-25.036.165-23.39-11.365.33-2.965 1.648-5.106 2.966-5.106 2.965 0 2.965 3.953-.165 6.588-2.471 2.141-1.977 4.941.988 4.941.989 0 1.153-.823.659-1.647-.659-.988.824-1.647 3.295-1.647 2.964 0 4.612-1.153 5.764-4.282 3.789-9.719-8.07-15.154-14-6.26z"></path>
        <path d="M541.381 374.68c-2.635 4.282-3.294 4.612-14.33 4.612-7.906 0-12.024-.66-12.353-2.141-1.483-4.283-3.789-1.648-3.789 4.447 0 10.377 3.46 15.812 5.436 8.565.659-2.471 2.635-3.295 10.377-3.789 5.436-.33 10.047-.494 10.212-.33 2.141 1.318-7.742 7.577-15.318 9.884l-9.389 2.635.824 6.423c.988 8.401 1.812 9.06 4.941 4.118 1.483-2.141 5.436-4.941 8.895-5.93 3.459-1.152 7.742-3.458 9.718-5.106 3.294-2.965 3.459-2.965 9.389 2.636 6.423 6.094 7.906 5.764 6.588-1.318-.659-3.295-1.812-4.447-4.612-4.447-4.118 0-9.883-5.6-8.236-8.071 1.483-2.471 3.46-2.306 6.589.823 4.117 4.118 5.765.824 4.447-8.4-1.482-9.718-5.27-11.695-9.389-4.612z"></path>
        <path d="M46.415 380.115c0 3.788-.824 4.941-3.13 4.941-3.623 0-5.6 3.789-3.13 6.26.989.988.989 1.976-.164 2.635-2.965 1.976-1.977 5.93 1.482 5.93 2.635 0 3.295.988 2.965 5.106-.659 6.423 2.47 7.906 6.424 3.294 2.47-2.965 3.294-3.13 6.259-1.153 7.412 4.777 14 5.93 19.766 3.624 7.082-2.965 8.4-5.765 9.718-20.424.988-12.025-.33-14.99-4.612-9.389-2.636 3.459-26.684 1.482-30.967-2.8-3.953-3.953-4.612-3.789-4.612 1.976zm14.165 8.236c3.954 0 3.954 0-1.317 4.777-3.624 3.294-6.095 4.282-7.906 3.458-1.318-.823-3.789-1.812-5.271-2.306-1.648-.494-2.965-1.647-2.965-2.8 0-.988.988-1.482 2.306-.988s3.294-.165 4.447-1.483c1.153-1.317 3.13-1.976 4.283-1.482 1.317.494 4.282.824 6.423.824zm16.801 6.094c1.153 7.577-9.883 13.012-17.954 8.73-3.953-2.141-2.47-5.436 4.447-10.047 6.26-4.118 12.848-3.46 13.507 1.317zm-26.849 6.918c.495.824.165 1.977-.823 2.636-.824.493-1.647-.165-1.647-1.483 0-2.965.988-3.459 2.47-1.153z"></path>
        <path d="M80.181 418.823c-1.153 1.647-5.93 2.8-14.824 3.459-11.036.823-13.672.659-15.483-1.648-3.46-4.117-5.271-1.482-4.118 6.095 1.318 8.73 1.647 8.895 5.436 5.436 1.812-1.647 5.106-2.635 7.412-2.306l4.282.494-3.953 4.94c-3.294 4.119-4.282 4.448-6.424 2.636-5.106-4.117-7.741 2.471-5.106 12.518.989 3.46 5.6 5.436 5.6 2.471 0-.659 1.153-2.47 2.306-4.117 1.977-2.636 2.636-2.636 6.919-.33 7.412 3.788 14.66 3.13 20.424-2.141 4.941-4.448 4.941-4.448 3.953-17.295-1.152-12.519-2.965-15.484-6.423-10.213zm-2.8 15.154c.659 5.93-4.282 10.377-11.2 10.377-8.565 0-9.06-2.471-1.813-9.718 8.071-8.071 12.354-8.236 13.013-.66zm-22.73 10.377c0 .823-.66 1.647-1.648 1.647-.823 0-1.647-.824-1.647-1.647 0-.989.824-1.648 1.647-1.648.989 0 1.648.66 1.648 1.648z"></path>
        <path d="M517.827 419.152c-2.964 2.306-3.953 5.107-4.447 12.519-.33 5.27-1.153 11.035-1.647 12.683-1.318 4.117 2.47 6.094 5.106 2.635 1.647-2.47 3.788-2.635 15.977-1.647 9.553.659 14.495 1.812 14.99 3.294 1.646 4.118 3.788 2.306 4.776-3.788 1.153-6.918-.988-10.542-4.118-7.412-1.152 1.152-4.94 1.976-8.4 1.976h-6.424l5.6-5.436c4.447-4.282 5.93-4.941 7.577-3.294 4.612 4.447 6.918 2.47 6.918-6.095 0-9.224-2.8-11.035-7.247-4.612-2.47 3.459-2.635 3.459-5.93.494-4.941-4.447-17.954-5.27-22.73-1.317zm20.59 5.6l4.612 1.648-6.095 5.765c-9.553 8.73-19.436 6.753-14.33-2.965 3.459-6.589 7.412-7.742 15.813-4.447zm12.024-.164c0 .823-.824 1.647-1.812 1.647-.824 0-1.153-.824-.659-1.647.494-.989 1.318-1.648 1.812-1.648.33 0 .659.66.659 1.648z"></path>
        <path d="M450.295 434.8c-3.46 3.459-2.307 13.342 2.14 19.93 5.107 7.412 12.519 11.53 18.12 10.048 3.788-.989 4.117-.66 4.117 5.27 0 5.6.33 6.095 2.471 3.79 3.624-3.625 4.777-12.849 2.635-20.92-2.306-8.07-5.106-9.224-5.106-1.976 0 7.247-6.588 10.047-12.683 5.6-4.941-3.789-9.224-14.66-7.906-20.095.988-3.954-.659-4.777-3.789-1.647z"></path>
        <path d="M76.063 454.73c0 1.154 1.483 2.966 3.295 4.118 2.47 1.483 3.294 3.789 3.294 9.06 0 8.565-4.777 14-13.671 15.483-4.777.659-6.589.165-10.047-3.295-4.448-4.612-5.436-8.4-2.471-10.377 2.8-1.647 5.93 2.142 3.623 4.448-2.47 2.47-.823 6.423 2.306 6.423 1.483 0 2.142-.988 1.648-2.306-.494-1.152.494-3.294 2.306-4.777 2.965-2.635 2.8-6.094-.66-10.706-2.47-3.13-8.894-2.306-11.694 1.647-8.235 11.695 6.095 26.849 22.402 23.719 6.588-1.153 14-7.742 15.483-13.507 1.317-5.106-.33-13.342-3.46-18.283-2.8-4.118-12.353-5.436-12.353-1.647z"></path>
        <path d="M511.239 457.201c-3.13 3.13-9.553 26.19-7.906 28.001.659.494 2.306-.164 3.623-1.647 2.307-2.306 3.789-2.14 15.813.989 7.248 2.141 14.166 4.941 15.318 6.423 2.636 3.789 3.624 3.46 4.777-1.152.66-2.471 2.471-4.283 4.777-4.613 2.636-.33 3.46-1.482 3.295-4.282-.33-1.976.33-3.624 1.153-3.624.988 0 1.647-1.482 1.647-3.294 0-1.977-1.153-3.295-2.635-3.295-2.142 0-2.471-1.152-1.648-5.765.989-4.94.66-5.764-2.14-5.764-1.813 0-4.283 1.482-5.601 3.294-1.976 2.965-2.47 2.965-3.295.988-3.13-7.906-21.412-12.024-27.177-6.259zm21.248 6.918c4.447 2.471 3.953 4.448-2.141 8.236-10.707 6.424-19.437 2.8-13.836-5.765 2.965-4.447 10.047-5.6 15.977-2.47zm13.012 3.294c0 .824-.659 1.648-1.647 1.648-.824 0-1.647-.824-1.647-1.648 0-.988.823-1.647 1.647-1.647.988 0 1.647.659 1.647 1.647zm-.988 8.236c1.318 0 2.8 1.153 3.295 2.635.823 1.977.164 2.306-2.471 1.483-1.812-.659-4.118-.33-5.271.494-1.153.823-4.118.988-7.577 0l-5.6-1.483 5.106-3.294c2.965-1.647 5.27-3.953 5.27-5.106s1.154-.33 2.636 1.647c1.318 1.976 3.459 3.624 4.612 3.624z"></path>
        <path d="M87.1 488.332c-1.977 1.812-1.318 3.789 1.152 3.789 5.93 0 9.718 12.683 5.93 19.93-4.118 7.577-18.613 10.542-23.72 4.941-3.294-3.623-2.964-8.565.33-9.718 1.483-.494 2.142.494 1.813 3.13-.66 4.282 1.152 8.07 3.623 8.07.989 0 1.483-1.317 1.153-2.964-.33-1.812.494-4.282 1.812-5.765 1.812-2.306 1.812-3.459-.494-6.918-4.941-7.577-14.165-3.624-14.165 5.93 0 3.294 1.647 6.588 4.777 9.883 9.388 9.388 28.824 4.94 34.095-7.742 2.142-5.271 2.142-6.424-.988-13.507-1.812-4.117-4.283-8.236-5.436-8.894-2.47-1.648-8.4-1.648-9.883-.165z"></path>
        <path d="M101.924 523.746c-3.46.988-8.73 4.117-11.86 7.082-14.989 14.166.659 33.931 19.437 24.543 13.176-6.754 16.965-14.99 11.035-24.543-3.459-5.435-8.07-9.224-11.036-8.894-.658.165-4.117.988-7.577 1.812zm9.059 9.06c4.118 3.623 3.788 8.4-.824 10.54-3.13 1.319-5.27.99-11.53-2.305l-7.741-4.118 5.436-3.459c6.423-4.117 10.541-4.282 14.659-.658zm-14.66 10.706c1.977.988 6.26 2.306 9.389 2.965l5.765.988-5.271 2.8c-7.742 4.118-14.33 3.624-16.8-1.153-3.624-6.588 0-9.388 6.917-5.6z"></path>
        <path d="M485.379 524.24c-6.589 3.459-10.871 9.553-11.86 17.295-.659 5.271-.33 6.589 2.636 8.071 1.812 1.153 3.458 1.648 3.623 1.483.165-.33.33-3.13.659-6.26.494-6.753 8.565-14.824 14.824-14.824 2.142 0 6.589 2.306 9.883 5.106 5.93 5.271 7.577 8.73 3.295 7.083-1.483-.66-2.471 0-2.471 1.482 0 1.647-1.153 2.141-3.953 1.647-7.742-1.482-11.201 10.542-4.118 14.495 4.118 2.141 11.695-1.812 14.33-7.577 7.412-16.307-11.2-35.908-26.848-28.001zm22.895 27.343c-1.812 1.976-3.459 2.635-4.447 1.647-1.977-1.977 0-5.106 3.13-5.106a2.495 2.495 0 002.47-2.141c0-1.483.33-1.483.989.164.494 1.153-.494 3.624-2.141 5.436z"></path>
        <path d="M457.542 557.348c-9.224 11.2-9.883 16.8-2.8 23.883 2.635 2.636 6.26 4.777 8.07 4.777 4.613 0 11.86-6.26 11.86-10.212 0-3.459 0-3.459 4.118.33 2.306 2.14 4.117 5.106 4.117 6.753 0 5.765 2.965 4.612 11.366-4.283 10.047-10.706 11.036-14.659 2.8-13.177-3.295.66-5.93.33-6.589-.658-1.647-2.471-4.282-2.306-4.282.33 0 1.317 1.976 3.129 4.282 4.282 3.46 1.482 3.954 2.306 2.307 4.282-1.813 2.141-3.789.989-13.342-7.577-8.071-7.082-11.366-11.2-11.366-14 0-6.095-2.47-4.777-10.542 5.27zm10.377 10.212c-2.471.494-2.965 1.482-2.141 4.612 1.152 4.777-1.648 5.27-6.26 1.153-3.294-2.965-3.953-8.73-1.153-11.53 1.318-1.318 3.295-.824 7.083 1.812 4.447 2.8 4.941 3.624 2.47 3.953z"></path>
        <path d="M139.973 558.83c-.66.659-.824 1.976-.33 3.13.494 1.152-.988 3.623-3.294 5.765-3.954 3.788-3.954 3.788-5.106.33-2.965-9.39-14.495-11.695-20.425-4.118-5.765 7.412-4.612 14.33 4.118 23.718 8.07 8.565 11.365 10.377 9.718 5.106-.659-2.306 1.812-5.27 9.718-12.353 5.765-5.106 11.86-9.224 13.507-9.224 2.306 0 2.47.494.988 1.976-2.635 2.636-2.47 6.26.33 6.26 2.635 0 12.518 7.742 12.518 9.883 0 .659-1.317 2.965-3.13 5.106l-2.964 3.788-6.26-3.788c-8.07-4.777-11.365-2.141-4.941 3.788l4.447 4.118-5.435-1.482c-8.071-2.307-14.66-1.977-14.66.658 0 2.142 20.59 19.107 23.225 19.107.824 0 1.482-1.976 1.482-4.282 0-6.26 14.495-23.72 19.437-23.72 5.765 0 3.788-2.964-8.071-12.847-5.765-4.777-13.507-11.695-17.13-15.318-3.789-3.624-7.248-6.095-7.742-5.6zm-17.13 15.154c-.99 3.788-.66 4.118 1.976 3.294 2.141-.823 1.812 0-1.483 2.965-5.765 5.271-7.412 5.106-9.718-.164-1.812-3.954-1.482-4.777 2.635-8.236 5.271-4.777 8.071-3.789 6.589 2.141zm24.377 33.766l-3.624 3.624-3.623-3.624-3.624-3.623H150.844z"></path>
        <path d="M439.918 574.148c-9.06 6.095-19.602 15.648-19.602 17.79 0 1.317-1.647 2.306-3.788 2.306-1.977 0-7.412 2.47-11.86 5.435-6.588 4.118-8.4 6.26-8.565 10.212-.658 7.907 3.295 11.53 12.683 11.53 7.907 0 8.071 0 5.106 3.295-4.447 4.941-5.27 6.918-4.117 9.718 2.635 6.588 22.236-.494 23.39-8.565.658-4.282-3.625-4.941-8.566-1.153-2.8 2.141-2.965 2.471-.494 2.471 3.789 0 3.459 2.8-.659 4.941-3.623 1.977-8.07 1.153-8.07-1.482 0-.824 1.811-3.789 4.117-6.424 5.93-7.082 5.271-8.73-2.965-7.577-11.365 1.648-15.154-6.423-5.6-12.189 3.953-2.47 4.777-2.47 6.095-.494 1.152 1.977 1.812 2.141 4.117.165 1.483-1.153 2.306-3.13 1.812-4.282-.494-1.318 0-1.812 1.648-1.153 1.152.494 2.306 0 2.306-.989 0-1.812 5.93-7.906 9.883-10.047 1.647-.824 4.447.33 8.73 4.118 3.788 3.294 5.106 5.27 3.294 4.777-3.459-.824-12.683 6.753-11.2 9.224 1.482 2.47 5.27 1.976 8.4-1.318 3.13-2.965 3.13-2.965-1.482 8.071-1.648 3.459-1.977 6.753-1.153 8.071.988 1.647 3.953.165 13.012-7.247 11.365-9.06 15.483-15.648 8.565-13.342-4.612 1.482-20.59-17.79-19.436-23.39.988-5.105-.66-5.764-5.6-2.47zm14.494 36.073c-3.953 3.953-5.765 1.976-4.117-4.282l1.482-5.6 2.635 3.788c2.306 3.295 2.306 3.788 0 6.095z"></path>
        <path d="M173.245 597.373c-2.47 4.777-2.141 5.6 2.47 4.447 6.26-1.647 13.343 2.965 15.649 9.554 2.47 7.742-1.648 16.636-9.225 20.26-4.94 2.47-5.764 2.47-9.718-.165-4.447-2.8-4.777-5.93-.988-7.247 1.153-.33 2.47.823 2.965 2.8.823 3.459 7.082 5.106 7.082 1.812 0-.989-.658-1.647-1.647-1.647-.824 0-1.647-2.142-1.647-4.612 0-3.46-1.153-5.271-4.283-6.589-10.377-4.777-14.824 7.412-5.435 15.154 15.812 13.342 38.543-7.906 28.66-26.849-4.448-8.73-20.425-13.177-23.884-6.918z"></path>
        <path d="M384.08 609.727c-2.307 1.317-6.59 3.294-9.72 4.447-11.2 4.118-12.188 21.578-1.811 32.778 6.753 7.247 15.648 6.753 31.296-1.482 4.117-2.142 2.8-5.765-2.636-7.248-4.117-1.152-5.6-2.964-8.07-10.212-2.307-6.918-2.471-9.883-1.153-13.671 2.47-7.248-.165-8.895-7.906-4.612zm.164 11.53c-1.483 1.812-1.483 3.13.165 5.93 1.812 2.964 1.812 3.623-.659 5.106-4.447 2.47-3.459 6.423 1.812 7.412 6.424 1.317 8.071 6.918 2.47 8.236-5.6 1.482-11.529-2.965-13.835-10.048-2.635-7.742-.988-13.342 4.612-16.307 5.765-3.13 7.906-3.294 5.436-.33zm7.577 15.153c-.494.494-1.977.66-3.13.165-1.317-.494-.823-.988.989-.988 1.812-.165 2.8.33 2.14.823zm8.73 5.6c0 .825-.33 1.648-.66 1.648-.493 0-1.317-.824-1.811-1.647-.494-.989-.165-1.647.659-1.647.988 0 1.812.658 1.812 1.647z"></path>
        <path d="M209.482 611.209c-5.765 2.965-8.236 13.012-4.612 19.272 2.635 4.612 2.635 4.776-2.141 6.588-5.93 2.471-6.424 8.565-.989 11.2 15.319 7.413 27.508 10.707 27.508 7.248 0-.824-1.153-2.8-2.471-4.612-3.295-4.447-3.13-7.083 1.482-17.46 2.635-5.764 5.271-9.388 7.412-10.047 6.095-1.482 3.789-3.788-8.894-9.224-14.33-5.93-12.19-5.6-17.295-2.965zm13.177 12.024c0 1.153-1.153 5.271-2.635 8.895-2.635 6.424-2.8 6.588-5.765 3.953-3.788-3.459-4.118-10.047-.494-14 2.8-3.13 8.895-2.307 8.895 1.152zm.824 28.331c-.33.33-2.471-1.482-4.777-3.953-3.295-3.788-4.118-4.118-4.283-1.976 0 3.294-2.14 3.788-6.753 1.317-3.788-2.141-3.953-3.953-.494-7.412 2.635-2.47 3.295-2.141 9.883 4.282 3.953 3.954 6.918 7.413 6.424 7.742z"></path>
      </g>
    </svg>
  );
}

export default Logo;