export function formatDate(date: string) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate}`;
}
