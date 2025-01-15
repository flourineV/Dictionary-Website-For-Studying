function Leaderboard() {
  // Dữ liệu fake cho bảng xếp hạng
  const leaderboardData = [
    { name: "Tuan Tran", days: 999 },
    { name: "Ga", days: 28 },
    { name: "Chicken", days: 27 },
    { name: "Superman", days: 25 },
    { name: "WonderWoman", days: 23 },
    { name: "Kwan", days: 22 },
    { name: "Fuck", days: 20 },
    { name: "Hallo", days: 18 },
    { name: "J97", days: 15 },
    { name: "Jack", days: 10 },
  ];

  // Hàm để xác định className cho tên top đầu
  const getNameClass = (index) => {
    if (index === 0) return "text-red-500 font-bold"; // Top 1
    if (index === 1) return "text-green-500 font-bold"; // Top 2
    if (index === 2) return "text-blue-500 font-bold"; // Top 3
    return "text-white"; // Các vị trí còn lại
  };

  return (
    <div className="relative left-12  bg-blue-950 p-4 rounded-lg shadow-md w-80">
      <h2 className="text-white text-lg font-bold mb-4 text-center">
        Top 10 Hard Members🚀
      </h2>
      <table className="w-full text-white">
        <thead>
          <tr>
            <th className="text-left pb-2">Name</th>
            <th className="text-right pb-2">Days</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className={`py-2 ${getNameClass(index)}`}>
                {index < 3 ? `Top ${index + 1} - ` : ""}
                {user.name}
              </td>
              <td className="py-2 text-right">{user.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
