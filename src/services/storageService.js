const KEY = "recall_data";

export function getAllTopics() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}

export function saveAllTopics(topics) {
  localStorage.setItem(KEY, JSON.stringify(topics));
}

export function addTopic(data) {
  const all = getAllTopics();
  const title = typeof data === 'string'? data : data.title;
  const subject = typeof data === 'string'? 'Other' : (data.subject || 'Other');

  const newTopic = {
    id: Date.now().toString(),
    title: title,
    subject: subject,
    level: 0,
    nextDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  all.push(newTopic);
  saveAllTopics(all);
  return all;
}

export function updateTopic(id, updatedFields) {
  const all = getAllTopics();
  const newList = all.map((t) => (t.id === id? {...t,...updatedFields } : t));
  saveAllTopics(newList);
  return newList;
}

export function deleteTopic(id) {
  const topics = getAllTopics().filter((t) => t.id!== id);
  saveAllTopics(topics);
  return topics;
}