export const heavyTask = async (data) => {
  console.log("Doing heavy work:", data);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("Task completed");
};
