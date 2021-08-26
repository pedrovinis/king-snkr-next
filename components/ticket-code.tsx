type Props = {
  code: string
}

export default function TicketCode({ code }: Props) {
  const codeDigits = code.length;
  const prefix = `XXXX-XXXX-XXXX-XXXX`.slice(codeDigits);
  return (
    <>
      Key: {prefix}
      {code}
    </>
  );
}
