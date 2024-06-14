export default function useGetWeek(fromDate) {
    var sunday = new Date(
        fromDate.setDate(fromDate.getDate() - fromDate.getDay())
      ),
      result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      result.push(new Date(sunday));
    }
    return result;
  }
  