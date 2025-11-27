export default function DetailsComments() {
  return (
    <ul className="space-y-4 mb-8">
      <li className="p-4 bg-gray-100 rounded-lg shadow">
        <p className="text-sm text-gray-600 mb-1">
          Author: <span className="font-medium text-gray-800">User1</span>
        </p>
        <p className="text-gray-700">
          Something.....
        </p>
      </li>

      <li className="p-4 bg-gray-100 rounded-lg shadow">
        <p className="text-sm text-gray-600 mb-1">
          Author: <span className="font-medium text-gray-800">User2</span>
        </p>
        <p className="text-gray-700">
          Something.....
        </p>
      </li>
    </ul>
  );
}
