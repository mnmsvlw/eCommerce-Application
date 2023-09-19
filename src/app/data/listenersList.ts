type EventItem = {
  id: string;
  eventType: string;
  eventListener: (e: Event) => void;
};

const listenersList: EventItem[] = [];

function addToEventList(item: EventItem) {
  listenersList.push(item);
}

const resetList = () => {
  listenersList.splice(0, listenersList.length);
};

export { listenersList, addToEventList, resetList };
