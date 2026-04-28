type PatternType = "rocket" | "crown" | "trophy" | "knight" | "card";

type PatternItem = {
  id: number;
  type: PatternType;
  top: number;
  left: number;
};

const PATTERN_SEQUENCE: PatternType[] = [
  "rocket",
  "crown",
  "trophy",
  "knight",
  "card",
];

function generatePatternItems(): PatternItem[] {
  const items: PatternItem[] = [];

  const rowGap = 18;
  const colGap = 18;
  const rows = 9;
  const cols = 7;

  let id = 0;

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : 9;

      items.push({
        id,
        type: PATTERN_SEQUENCE[
          (row + col + PATTERN_SEQUENCE.length) % PATTERN_SEQUENCE.length
        ],
        top: row * rowGap,
        left: col * colGap + offset,
      });

      id++;
    }
  }

  return items;
}

const PATTERN_ITEMS = generatePatternItems();

// ─────────────────────────────────────────────
// SVGs
// ─────────────────────────────────────────────

function CrownIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 83.3333C16.6667 81.1232 17.5447 79.0036 19.1075 77.4408C20.6703 75.878 22.7899 75 25.0001 75H75.0001C77.2102 75 79.3298 75.878 80.8926 77.4408C82.4554 79.0036 83.3334 81.1232 83.3334 83.3333V87.5C83.3334 88.6051 82.8944 89.6649 82.113 90.4463C81.3316 91.2277 80.2718 91.6667 79.1667 91.6667H20.8334C19.7283 91.6667 18.6685 91.2277 17.8871 90.4463C17.1057 89.6649 16.6667 88.6051 16.6667 87.5V83.3333Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.9751 24.7627L58.5043 47.0127C58.7219 47.7484 59.1385 48.4097 59.7081 48.9238C60.2776 49.4378 60.9781 49.7846 61.7321 49.926C62.4862 50.0673 63.2647 49.9977 63.9818 49.7248C64.6988 49.4519 65.3266 48.9863 65.7959 48.3794L76.6959 34.2044"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M83.3333 37.5L70.8333 75"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3083 34.2044L34.2042 48.3835C34.6738 48.9904 35.3019 49.4558 36.0192 49.7285C36.7365 50.0011 37.5152 50.0703 38.2693 49.9285C39.0235 49.7868 39.7239 49.4395 40.2932 48.925C40.8625 48.4104 41.2787 47.7487 41.4958 47.0127L48.025 24.7627"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1667 75L16.6667 37.5"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50.0001 24.9997C54.6025 24.9997 58.3334 21.2687 58.3334 16.6663C58.3334 12.064 54.6025 8.33301 50.0001 8.33301C45.3977 8.33301 41.6667 12.064 41.6667 16.6663C41.6667 21.2687 45.3977 24.9997 50.0001 24.9997Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M83.3333 37.4997C87.9357 37.4997 91.6667 33.7687 91.6667 29.1663C91.6667 24.564 87.9357 20.833 83.3333 20.833C78.731 20.833 75 24.564 75 29.1663C75 33.7687 78.731 37.4997 83.3333 37.4997Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6666 37.4997C21.269 37.4997 24.9999 33.7687 24.9999 29.1663C24.9999 24.564 21.269 20.833 16.6666 20.833C12.0642 20.833 8.33325 24.564 8.33325 29.1663C8.33325 33.7687 12.0642 37.4997 16.6666 37.4997Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8333 83.3333C20.8333 81.1232 21.7112 79.0036 23.274 77.4408C24.8368 75.878 26.9564 75 29.1666 75H70.8333C73.0434 75 75.163 75.878 76.7258 77.4408C78.2886 79.0036 79.1666 81.1232 79.1666 83.3333V87.5C79.1666 88.6051 78.7276 89.6649 77.9462 90.4463C77.1648 91.2277 76.105 91.6667 74.9999 91.6667H24.9999C23.8948 91.6667 22.835 91.2277 22.0536 90.4463C21.2722 89.6649 20.8333 88.6051 20.8333 87.5V83.3333Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.5 74.9997C68.75 72.4372 75 64.7455 75 54.4872C75 36.5372 60.4167 18.5913 50 8.33301C39.5833 18.5913 25 36.5413 25 54.4872C25 64.7455 31.25 72.4372 37.5 74.9997"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66.6667 29.167L56.25 39.5837"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.5 8.33301H62.5"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KnightIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8333 83.3333C20.8333 81.1232 21.7112 79.0036 23.274 77.4408C24.8368 75.878 26.9564 75 29.1666 75H70.8333C73.0434 75 75.163 75.878 76.7258 77.4408C78.2886 79.0036 79.1666 81.1232 79.1666 83.3333V87.5C79.1666 88.6051 78.7276 89.6649 77.9462 90.4463C77.1648 91.2277 76.105 91.6667 74.9999 91.6667H24.9999C23.8948 91.6667 22.835 91.2277 22.0536 90.4463C21.2722 89.6649 20.8333 88.6051 20.8333 87.5V83.3333Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M68.75 74.9997C72.9167 66.6663 79.1667 54.1663 79.1667 37.4997C79.1667 29.7642 76.0938 22.3455 70.624 16.8757C65.1542 11.4059 57.7355 8.33301 50 8.33301H27.6459C26.8542 8.3333 26.0789 8.55916 25.4109 8.98414C24.7429 9.40911 24.2098 10.0156 23.874 10.7326C23.5383 11.4496 23.4137 12.2474 23.515 13.0327C23.6163 13.8179 23.9392 14.558 24.4459 15.1663L29.1667 20.833L19.5 45.008C18.7266 46.9398 18.704 49.0911 19.4365 51.0388C20.169 52.9864 21.6036 54.5896 23.4584 55.533L35.4167 61.5997"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.5 20.833L68.4375 14.8955"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.8333 33.333L77.2083 26.958"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.4709 50.7705L29.1667 74.9997"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.0002 41.667H16.6668C12.0645 41.667 8.3335 45.398 8.3335 50.0003V83.3337C8.3335 87.936 12.0645 91.667 16.6668 91.667H50.0002C54.6025 91.667 58.3335 87.936 58.3335 83.3337V50.0003C58.3335 45.398 54.6025 41.667 50.0002 41.667Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74.6665 58.3336L89.2498 43.7503C90.7958 42.0357 91.6515 39.8089 91.6515 37.5003C91.6515 35.1916 90.7958 32.9649 89.2498 31.2503L68.4165 10.7503C66.7019 9.20428 64.4752 8.34863 62.1665 8.34863C59.8578 8.34863 57.6311 9.20428 55.9165 10.7503L41.6665 25.0003"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 75H25.0417"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.6665 58.333H41.7082"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.5 25H62.5417"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75 37.5H75.0417"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M70.8333 12.5H87.4999V29.1667"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M77.3958 46.1748C83.3288 57.7787 84.8791 71.1327 81.7624 83.7873C81.5631 84.6041 81.1559 85.3554 80.5804 85.9683C80.0049 86.5813 79.2806 87.0349 78.478 87.2853C77.6754 87.5356 76.8217 87.5741 75.9998 87.3971C75.1779 87.22 74.4158 86.8334 73.7874 86.2748L58.3333 70.8331"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1665 48.9878L13.7082 33.5295C13.1537 32.9001 12.771 32.1384 12.597 31.3179C12.423 30.4974 12.4637 29.6459 12.715 28.8456C12.9664 28.0454 13.42 27.3236 14.0319 26.75C14.6439 26.1764 15.3935 25.7703 16.2082 25.5711C28.8677 22.4539 42.2268 24.0073 53.8332 29.9461"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.6662 58.333C28.732 58.3315 27.8066 58.5147 26.9435 58.8723C26.0804 59.2298 25.2965 59.7546 24.6371 60.4164L13.6121 71.4414C13.3202 71.7325 13.1213 72.1036 13.0404 72.5079C12.9596 72.9121 13.0005 73.3312 13.158 73.7122C13.3155 74.0932 13.5824 74.4188 13.9251 74.648C14.2677 74.8772 14.6707 74.9996 15.0829 74.9997H21.3329C22.438 74.9997 23.4978 75.4387 24.2792 76.2201C25.0606 77.0015 25.4996 78.0613 25.4996 79.1664V85.4164C25.4988 85.8289 25.6206 86.2325 25.8495 86.5757C26.0783 86.919 26.404 87.1866 26.7851 87.3446C27.1663 87.5026 27.5857 87.5439 27.9904 87.4632C28.395 87.3825 28.7665 87.1835 29.0579 86.8914L40.0829 75.8622C40.7447 75.2027 41.2694 74.4189 41.627 73.5557C41.9845 72.6926 42.1678 71.7673 42.1662 70.833V62.4997C42.1662 61.3946 41.7272 60.3348 40.9458 59.5534C40.1644 58.772 39.1046 58.333 37.9996 58.333H29.6662Z"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41 60.0542L88.0542 13"
        stroke="#FFEAD5"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PatternIcon({ type }: { type: PatternType }) {
  switch (type) {
    case "rocket":
      return <ArrowIcon />;
    case "crown":
      return <CrownIcon />;
    case "trophy":
      return <TrophyIcon />;
    case "knight":
      return <KnightIcon />;
    case "card":
      return <CardIcon />;
    default:
      return null;
  }
}

// ─────────────────────────────────────────────
// Main Background Component
// ─────────────────────────────────────────────
export default function ChatPageBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* Wallpaper Pattern Layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PATTERN_ITEMS.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <PatternIcon type={item.type} />
          </div>
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// How to use
//  <ChatPageBackground>
//    <div>
//      Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel totam
//      perferendis dolorum eaque. Cupiditate, nisi repudiandae minus aliquam iste
//      dignissimos velit debitis molestiae vitae suscipit alias sunt. Sit
//      voluptate minima quidem eum soluta labore beatae nobis eligendi ab quod
//      numquam repudiandae modi qui vero quae nemo laboriosam delectus, dolor
//      quasi perferendis laborum rem iste nam illum! Corporis molestiae ratione
//      obcaecati quibusdam fugiat, ab tempora nisi vitae quidem quisquam odit
//      illum aspernatur iste. Sed corporis impedit reprehenderit nemo, unde
//      explicabo eaque provident rem minima quod, dolor aut. Suscipit molestiae
//      nihil, sapiente id nisi distinctio saepe fugit omnis beatae accusantium
//      possimus assumenda. lorem3000
//    </div>
//  </ChatPageBackground>;
