export function getDuration(startDateTime, endDateTime) {
    // Parse the datetime strings into Date objects
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
  
    // Calculate the difference in milliseconds
    const diff = end - start;
  
    // Calculate the time components
    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
  
    const days = Math.floor(diff / msInDay);
    const hours = Math.floor((diff % msInDay) / msInHour);
    const minutes = Math.floor((diff % msInHour) / msInMinute);
    const seconds = Math.floor((diff % msInMinute) / msInSecond);
  
    // Collect the non-zero components into an array
    const components = [];
    if (days > 0) components.push(`${days} d`);
    if (hours > 0) components.push(`${hours} h`);
    if (minutes > 0) components.push(`${minutes} m`);
    //   if (seconds > 0) components.push(`${seconds} s`);
  
    // Join the components into a single string
    return components.length > 0 ? components.join(" ") : "0 seconds";
  }
  
  export function formatCurrency(amount, currency = "IDR") {
    // Create a number formatter for the specified currency
    const formatter = new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    // Format the amount
    return formatter.format(amount);
  }
  