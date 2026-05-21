import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [goals, setGoals] = useState(() => {
    return JSON.parse(localStorage.getItem("goals")) || [
      {
        title: 'Career Growth',
        target: '2 hrs learning',
        weight: 30,
        planned: 2,
        completed: 1.5,
      }
    ];
  });



  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    weight: "",
    planned: "",
    completed: ""
  });

  const addGoal = () => {
    if (
      !newGoal.title ||
      !newGoal.target ||
      !newGoal.weight ||
      !newGoal.planned
    ) return;

    setGoals([
      ...goals,
      {
        ...newGoal,
        weight: Number(newGoal.weight),
        planned: Number(newGoal.planned),
        completed: Number(newGoal.completed)
      }
    ]);

    setNewGoal({
      title: "",
      target: "",
      weight: "",
      planned: "",
      completed: ""
    });
  };

  const calculateScore = (planned, completed, weight) => {
    const ratio = Math.min(completed / planned, 1);
    return ratio * weight;
  };

  const totalScore = goals.reduce(
    (acc, goal) =>
      acc +
      calculateScore(
        goal.planned,
        goal.completed,
        goal.weight
      ),
    0
  );

  const getStatus = () => {
    if (totalScore >= 85) return "Excellent Discipline";
    if (totalScore >= 70) return "Strong Progress";
    if (totalScore >= 50) return "Average Consistency";
    return "Needs Improvement";
  };
  const deleteGoal = (index) => {
    const updatedGoals =
      goals.filter((_, i) => i !== index);

    setGoals(updatedGoals);
  };

  useEffect(() => {
    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white p-6 rounded-3xl shadow-xl mb-6">

          <h1 className="text-4xl font-bold">
            Life Goal Tracking Dashboard
          </h1>

          <p className="text-gray-500 mb-6">
            Track daily goals dynamically
          </p>

          <div className="grid md:grid-cols-2 gap-3">

            <input
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  title: e.target.value
                })
              }
              className="border p-3 rounded"
            />

            <input
              placeholder="Target"
              value={newGoal.target}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  target: e.target.value
                })
              }
              className="border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Weight"
              value={newGoal.weight}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  weight: e.target.value
                })
              }
              className="border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Planned hrs"
              value={newGoal.planned}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  planned: e.target.value
                })
              }
              className="border p-3 rounded"
            />

            <input
              type="number"
              placeholder="Completed hrs"
              value={newGoal.completed}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  completed: e.target.value
                })
              }
              className="border p-3 rounded"
            />

            <button
              onClick={addGoal}
              className="bg-blue-500 text-white rounded p-3"
            >
              Add Goal
            </button>


          </div>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow mb-6">
          <h2>Execution Score</h2>
          <p className="text-4xl">
            {Math.round(totalScore)}%
          </p>

          <p className="font-bold mt-2">
            {getStatus()}
          </p>
        </div>

        {goals.map((goal, index) => {

          const score = calculateScore(
            goal.planned,
            goal.completed,
            goal.weight
          );

          const percentage = Math.min(
            goal.completed /
            goal.planned * 100,
            100
          );

          return (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow mb-4"
            >

              <h2 className="text-2xl font-bold">
                {goal.title}
              </h2>

              <p>{goal.target}</p>

              <div className="w-full bg-gray-200 h-4 rounded mt-3">

                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{
                    width: `${percentage}%`
                  }}
                />

              </div>

              <div className="flex justify-between mt-3">

                <span>
                  Planned:
                  {goal.planned}
                </span>

                <span>
                  Completed:
                  {goal.completed}
                </span>

                <span>
                  Score:
                  {Math.round(score)}
                </span>

              </div>
              <button
                onClick={() => deleteGoal(index)}
                className="bg-red-500 text-white px-3 py-2 rounded mt-3"
              >
                Delete
              </button>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default App
