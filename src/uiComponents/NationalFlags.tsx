import { FC } from "react";
import { hasFlag } from "country-flag-icons";
import * as flags from "country-flag-icons/react/3x2";

type Props = {
  countryCode: string;
};

const NationalFlags: FC<Props> = (props: Props) => {
  const { countryCode } = props;

  if (!hasFlag(countryCode)) {
    return (
      <img
        src={`https://www.countryflags.io/${countryCode}/flat/64.png`}
        alt={countryCode}
      />
    );
  }

  const Flag = flags[countryCode as keyof typeof flags];

  return (
    <div className="flex rounded-md overflow-hidden">
      <Flag />
    </div>
  );
};

export default NationalFlags;
