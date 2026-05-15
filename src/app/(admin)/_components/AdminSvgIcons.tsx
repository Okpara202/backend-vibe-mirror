interface AdminSideNavIconProps {
  className?: string;
}

export function AdminHomeIcon({ className }: AdminSideNavIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.33333C2.49994 8.09089 2.55278 7.85135 2.65482 7.63143C2.75687 7.41151 2.90566 7.2165 3.09083 7.06L8.92417 2.06C9.22499 1.80576 9.60613 1.66627 10 1.66627C10.3939 1.66627 10.775 1.80576 11.0758 2.06L16.9092 7.06C17.0943 7.2165 17.2431 7.41151 17.3452 7.63143C17.4472 7.85135 17.5001 8.09089 17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V8.33333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminProjectIconSvg({ className }: AdminSideNavIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M3.33333 16.6667H16.6667C17.1087 16.6667 17.5326 16.4911 17.8452 16.1785C18.1577 15.866 18.3333 15.442 18.3333 15V6.66667C18.3333 6.22464 18.1577 5.80072 17.8452 5.48816C17.5326 5.17559 17.1087 5 16.6667 5H10.0583C9.78382 4.99858 9.51391 4.92937 9.27258 4.79853C9.03125 4.66769 8.82598 4.47927 8.675 4.25L7.99167 3.25C7.84069 3.02073 7.63541 2.83231 7.39409 2.70147C7.15276 2.57063 6.88285 2.50142 6.60833 2.5H3.33333C2.89131 2.5 2.46738 2.67559 2.15482 2.98816C1.84226 3.30072 1.66667 3.72464 1.66667 4.16667V15C1.66667 15.9167 2.41667 16.6667 3.33333 16.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.6667C10.4602 11.6667 10.8333 11.2936 10.8333 10.8333C10.8333 10.3731 10.4602 10 10 10C9.53976 10 9.16667 10.3731 9.16667 10.8333C9.16667 11.2936 9.53976 11.6667 10 11.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminUserIconSvg({ className }: AdminSideNavIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M15.8333 17.5V15.8333C15.8333 14.9493 15.4821 14.1014 14.857 13.4763C14.2319 12.8512 13.3841 12.5 12.5 12.5H7.5C6.61595 12.5 5.7681 12.8512 5.14298 13.4763C4.51786 14.1014 4.16667 14.9493 4.16667 15.8333V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.16667C11.841 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.841 2.5 10 2.5C8.15905 2.5 6.66667 3.99238 6.66667 5.83333C6.66667 7.67428 8.15905 9.16667 10 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminRevenueIcon({ className }: AdminSideNavIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.6667C10.9205 11.6667 11.6667 10.9205 11.6667 10C11.6667 9.07954 10.9205 8.33334 10 8.33334C9.07952 8.33334 8.33333 9.07954 8.33333 10C8.33333 10.9205 9.07952 11.6667 10 11.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10H5.00833M15 10H15.0083"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
