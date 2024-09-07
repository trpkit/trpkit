export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedMonth = monthNames[Number.parseInt(month, 10) - 1];

  return `${formattedMonth} ${Number.parseInt(day, 10)}, ${year}`;
}
