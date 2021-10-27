import { Calendar } from "./components/Calendar";

export function App() {
  const handleGetDateCalendar = (date) => {
    console.log(date);
  };
  return (
    <div className="app">
      <Calendar
        getDateSelect={(date) => {
          console.log(date);
        }}
      />
    </div>
  );
}
