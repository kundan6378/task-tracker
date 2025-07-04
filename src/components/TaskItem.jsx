import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const TaskItem = ({
  title,
  description,
  onDelete,
  onEdit,
  onComplete,
  completed,
  createdAt,
}) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  return (
    <div
      className={`p-5 rounded-xl shadow-md border transition transform hover:scale-[1.01] ${
        completed ? "bg-green-100 border-green-300" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2
            className={`text-lg font-semibold ${
              completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-sm mt-1 ${
              completed ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">
              Created on: {formattedDate}
            </p>

            {description}
          </p>
        </div>

        {/* Action Icons */}
        <div className="flex gap-2 mt-1">
          <CheckCircleIcon
            onClick={onComplete}
            className={`w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer ${
              completed ? "opacity-50" : ""
            }`}
            title="Mark Completed"
          />
          <PencilSquareIcon
            onClick={onEdit}
            className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer"
            title="Edit"
          />
          <TrashIcon
            onClick={onDelete}
            className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
