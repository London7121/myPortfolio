import { experienceData } from "../../../constants/experienceData";

const ExperiencePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-16">
        {experienceData[0].title}
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {experienceData[0].data.map((item, idx) => (
          <div
            key={idx}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700
              ${idx % 2 === 0 ? "md:ml-auto" : "md:mr-auto"} md:w-4/5`}
          >
            <div className="flex items-center mb-4">
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.company}
                  className="w-10 h-10 rounded-full mr-4"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {item.position}
                </h2>
                <p className="text-gray-500 text-sm">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            </div>

            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
              {item.company}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {item.description}
            </p>
            {item.project && (
              <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white px-3 py-1 rounded-full text-sm">
                {item.project}
              </span>
            )}

            {/* Timeline Circle */}
            <div
              className={`absolute top-6 w-4 h-4 bg-blue-500 rounded-full shadow-md
                ${idx % 2 === 0 ? "-left-2" : "-right-2"} hidden md:block`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
