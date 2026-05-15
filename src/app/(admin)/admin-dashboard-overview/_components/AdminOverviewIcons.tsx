interface Props {
  className?: string;
}

export function BackIcon({ className }: Props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M11.6667 10.5V9.33333C11.6667 8.71449 11.4209 8.121 10.9833 7.68342C10.5457 7.24583 9.95221 7 9.33337 7H2.33337"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25004 9.91667L2.33337 7L5.25004 4.08333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NotificationIcon({ className }: Props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M5.98962 12.25C6.09202 12.4273 6.2393 12.5746 6.41665 12.677C6.594 12.7794 6.79517 12.8333 6.99996 12.8333C7.20474 12.8333 7.40592 12.7794 7.58327 12.677C7.76061 12.5746 7.90789 12.4273 8.01029 12.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.90277 8.94017C1.82657 9.02369 1.77628 9.12756 1.75802 9.23914C1.73976 9.35072 1.75433 9.4652 1.79994 9.56865C1.84554 9.6721 1.92024 9.76008 2.01492 9.82186C2.10961 9.88365 2.22021 9.91658 2.33327 9.91667H11.6666C11.7797 9.91671 11.8903 9.8839 11.985 9.82223C12.0798 9.76056 12.1546 9.67269 12.2003 9.5693C12.246 9.46591 12.2607 9.35147 12.2426 9.23988C12.2245 9.12829 12.1744 9.02437 12.0983 8.94075C11.3224 8.141 10.4999 7.29108 10.4999 4.66667C10.4999 3.73841 10.1312 2.84817 9.47481 2.19179C8.81844 1.53542 7.9282 1.16667 6.99994 1.16667C6.07168 1.16667 5.18144 1.53542 4.52507 2.19179C3.86869 2.84817 3.49994 3.73841 3.49994 4.66667C3.49994 7.29108 2.67686 8.141 1.90277 8.94017Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
