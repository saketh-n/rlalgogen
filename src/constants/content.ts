export const models = ['Claude', 'GPT', 'Grok'];

export const defaultContent = {
  title: "Novel RL Algo",
  description: "A revolutionary reinforcement learning algorithm that combines policy gradient methods with value-based learning for more efficient exploration in complex environments.",
  pseudocode: `function train(env, params):
  Initialize policy π
  for episode in range(MAX_EPISODES):
    state = env.reset()
    while not done:
      action = π(state)
      next_state, reward = env.step(action)
      update_policy(π, state, action, reward)
      state = next_state`
}; 