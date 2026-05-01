export function ToggleLeftSideBar({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M9 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V9M9 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V9M9 3V21M3 9V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H9M3 9H21M21 9V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M8 0.25H30C34.2802 0.25 37.75 3.71979 37.75 8V30C37.75 34.2802 34.2802 37.75 30 37.75H8C3.71979 37.75 0.25 34.2802 0.25 30V8C0.25 3.71979 3.71979 0.25 8 0.25Z"
        stroke="#DDDCD6"
        strokeWidth="0.5"
      />
      <g clipPath="url(#clip0_443_508)">
        <path
          d="M18.9998 24.8327C22.2215 24.8327 24.8332 22.221 24.8332 18.9993C24.8332 15.7777 22.2215 13.166 18.9998 13.166C15.7782 13.166 13.1665 15.7777 13.1665 18.9993C13.1665 22.221 15.7782 24.8327 18.9998 24.8327Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9998 13.166C17.502 14.7388 16.6665 16.8274 16.6665 18.9993C16.6665 21.1713 17.502 23.2599 18.9998 24.8327C20.4977 23.2599 21.3332 21.1713 21.3332 18.9993C21.3332 16.8274 20.4977 14.7388 18.9998 13.166Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.1665 19H24.8332"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_443_508">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function CodeTagIcon({ className }: { className?: string }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M8 0.25H30C34.2802 0.25 37.75 3.71979 37.75 8V30C37.75 34.2802 34.2802 37.75 30 37.75H8C3.71979 37.75 0.25 34.2802 0.25 30V8C0.25 3.71979 3.71979 0.25 8 0.25Z"
        stroke="#DDDCD6"
        strokeWidth="0.5"
      />
      <path
        d="M22.5 21.3327L24.8333 18.9993L22.5 16.666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4998 16.666L13.1665 18.9993L15.4998 21.3327"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4582 14.334L17.5415 23.6673"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperIcon({ className }: { className?: string }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className ?? ""}`}
    >
      <path
        d="M8 0.25H30C34.2802 0.25 37.75 3.71979 37.75 8V30C37.75 34.2802 34.2802 37.75 30 37.75H8C3.71979 37.75 0.25 34.2802 0.25 30V8C0.25 3.71979 3.71979 0.25 8 0.25Z"
        stroke="#DDDCD6"
        strokeWidth="0.5"
      />
      <path
        d="M15.4997 24.8327C15.1903 24.8327 14.8935 24.7098 14.6747 24.491C14.4559 24.2722 14.333 23.9754 14.333 23.666V14.3327C14.333 14.0233 14.4559 13.7265 14.6747 13.5077C14.8935 13.2889 15.1903 13.166 15.4997 13.166H20.1663C20.351 13.1657 20.5339 13.202 20.7045 13.2726C20.8751 13.3433 21.03 13.447 21.1603 13.5779L23.2533 15.6709C23.3845 15.8012 23.4885 15.9563 23.5594 16.1271C23.6303 16.2979 23.6666 16.4811 23.6663 16.666V23.666C23.6663 23.9754 23.5434 24.2722 23.3246 24.491C23.1058 24.7098 22.8091 24.8327 22.4997 24.8327H15.4997Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.167 13.166V16.0827C20.167 16.2374 20.2285 16.3858 20.3378 16.4952C20.4472 16.6046 20.5956 16.666 20.7503 16.666H23.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeSvgIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 24.5V15.1667C17.5 14.8572 17.3771 14.5605 17.1583 14.3417C16.9395 14.1229 16.6428 14 16.3333 14H11.6667C11.3572 14 11.0605 14.1229 10.8417 14.3417C10.6229 14.5605 10.5 14.8572 10.5 15.1667V24.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 11.6659C3.49992 11.3265 3.57389 10.9912 3.71675 10.6833C3.85962 10.3754 4.06793 10.1024 4.32717 9.88326L12.4938 2.88326C12.915 2.52732 13.4486 2.33203 14 2.33203C14.5514 2.33203 15.085 2.52732 15.5062 2.88326L23.6728 9.88326C23.9321 10.1024 24.1404 10.3754 24.2832 10.6833C24.4261 10.9912 24.5001 11.3265 24.5 11.6659V22.1659C24.5 22.7848 24.2542 23.3783 23.8166 23.8158C23.379 24.2534 22.7855 24.4993 22.1667 24.4993H5.83333C5.21449 24.4993 4.621 24.2534 4.18342 23.8158C3.74583 23.3783 3.5 22.7848 3.5 22.1659V11.6659Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatSvgIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.49096 19.066C3.6625 19.4987 3.7007 19.9728 3.60062 20.4275L2.35812 24.2658C2.31809 24.4604 2.32844 24.6621 2.3882 24.8516C2.44795 25.0412 2.55513 25.2123 2.69957 25.3488C2.84401 25.4853 3.02092 25.5826 3.21352 25.6316C3.40613 25.6805 3.60805 25.6794 3.80012 25.6285L7.78196 24.4641C8.21096 24.379 8.65524 24.4162 9.06412 24.5715C11.5554 25.7349 14.3776 25.981 17.0326 25.2665C19.6877 24.5519 22.0051 22.9226 23.5759 20.6659C25.1468 18.4092 25.8701 15.6703 25.6183 12.9323C25.3665 10.1943 24.1558 7.63317 22.1997 5.70086C20.2436 3.76854 17.6679 2.58917 14.9271 2.37084C12.1862 2.15251 9.45628 2.90924 7.21897 4.50752C4.98166 6.1058 3.38074 8.44293 2.69867 11.1065C2.01659 13.7701 2.29719 16.5891 3.49096 19.066Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIconSvg({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24.4999 24.5008L19.4365 19.4375"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8333 22.1667C17.988 22.1667 22.1667 17.988 22.1667 12.8333C22.1667 7.67868 17.988 3.5 12.8333 3.5C7.67868 3.5 3.5 7.67868 3.5 12.8333C3.5 17.988 7.67868 22.1667 12.8333 22.1667Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectIconSvg({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.66634 23.3333H23.333C23.9518 23.3333 24.5453 23.0875 24.9829 22.6499C25.4205 22.2123 25.6663 21.6188 25.6663 21V9.33333C25.6663 8.7145 25.4205 8.121 24.9829 7.68342C24.5453 7.24583 23.9518 7 23.333 7H14.0813C13.697 6.99801 13.3191 6.90112 12.9813 6.71795C12.6434 6.53477 12.356 6.27098 12.1447 5.95L11.188 4.55C10.9766 4.22902 10.6893 3.96523 10.3514 3.78205C10.0135 3.59888 9.63566 3.50199 9.25134 3.5H4.66634C4.0475 3.5 3.45401 3.74583 3.01643 4.18342C2.57884 4.621 2.33301 5.21449 2.33301 5.83333V21C2.33301 22.2833 3.38301 23.3333 4.66634 23.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9997 16.3333C14.644 16.3333 15.1663 15.811 15.1663 15.1667C15.1663 14.5223 14.644 14 13.9997 14C13.3553 14 12.833 14.5223 12.833 15.1667C12.833 15.811 13.3553 16.3333 13.9997 16.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UpgradeIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z"
        fill="#F27A1A"
      />
      <path
        d="M10.667 17.3338C10.5408 17.3342 10.4171 17.2988 10.3103 17.2318C10.2034 17.1647 10.1178 17.0687 10.0634 16.9549C10.0089 16.8411 9.98785 16.7142 10.0027 16.5889C10.0175 16.4636 10.0675 16.3451 10.147 16.2471L16.747 9.4471C16.7965 9.38996 16.864 9.35134 16.9383 9.33759C17.0127 9.32384 17.0895 9.33578 17.1561 9.37144C17.2228 9.4071 17.2754 9.46437 17.3052 9.53384C17.335 9.60331 17.3404 9.68087 17.3203 9.75377L16.0403 13.7671C16.0026 13.8681 15.9899 13.9768 16.0034 14.0838C16.0169 14.1908 16.0561 14.2929 16.1177 14.3814C16.1793 14.4699 16.2615 14.5421 16.3572 14.5919C16.4528 14.6416 16.5592 14.6675 16.667 14.6671H21.3337C21.4598 14.6667 21.5835 14.702 21.6904 14.7691C21.7972 14.8362 21.8828 14.9322 21.9373 15.046C21.9917 15.1598 22.0128 15.2867 21.998 15.412C21.9832 15.5373 21.9331 15.6558 21.8537 15.7538L15.2537 22.5538C15.2041 22.6109 15.1367 22.6495 15.0623 22.6633C14.988 22.677 14.9112 22.6651 14.8445 22.6294C14.7778 22.5938 14.7253 22.5365 14.6954 22.467C14.6656 22.3976 14.6603 22.32 14.6803 22.2471L15.9603 18.2338C15.9981 18.1328 16.0107 18.0241 15.9973 17.9171C15.9838 17.8101 15.9445 17.708 15.8829 17.6195C15.8213 17.531 15.7391 17.4588 15.6435 17.409C15.5478 17.3592 15.4415 17.3334 15.3337 17.3338H10.667Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
