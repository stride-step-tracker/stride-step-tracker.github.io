const goals = {
  steps: { label: 'A daily step goal', value: '8,000', unit: 'steps', title: 'Make it your kind of day.', description: 'Choose your own step target and follow your progress as the day unfolds. Pause tracking whenever you need to.', note: 'Your goal. Your pace.' },
  time: { label: 'An optional walking-time goal', value: '30', unit: 'minutes', title: 'Make a little time for a walk.', description: 'Set a separate walking-time target, or leave it off. Stride estimates walking time from supported activity sensors, alongside confirmed steps.', note: 'Walking time is an estimate; availability depends on your device.' }
};
document.querySelectorAll('[data-goal]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.goal;
    const goal = goals[key];
    document.querySelectorAll('[data-goal]').forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); });
    document.querySelector('.goal-demo').classList.toggle('time-selected', key === 'time');
    document.getElementById('demo-label').textContent = goal.label;
    const value = document.getElementById('demo-value'); value.replaceChildren(document.createTextNode(goal.value + ' '));
    const unit = document.createElement('small'); unit.textContent = goal.unit; value.append(unit);
    document.getElementById('demo-title').textContent = goal.title;
    document.getElementById('demo-description').textContent = goal.description;
    document.getElementById('demo-note').textContent = goal.note;
  });
});
