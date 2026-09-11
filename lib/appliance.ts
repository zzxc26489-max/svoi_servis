// Выбор техники из блока «Что сломалось?» → форма заявки.
//
// Блок и форма живут в разных секциях страницы и ничего друг о друге
// не знают. Общего стора в проекте нет и заводить его ради одного
// значения незачем — хватает события на window: блок его шлёт, форма
// читает через useSyncExternalStore. sessionStorage рядом нужен для
// случая, когда человек кликнул по карточке и ушёл на другую
// страницу: вернётся к форме — выбор ещё на месте.

const EVENT_NAME = "appliance-selected";
const STORAGE_KEY = "svoi-servis:appliance";

/** Названия — в единственном числе: они попадают в текст заявки
    («Холодильник, +7 …»), а не в заголовок раздела. */
export type ApplianceName =
  | "Холодильник"
  | "Стиральная машина"
  | "Посудомоечная машина";

function write(name: ApplianceName | null): void {
  try {
    if (name) sessionStorage.setItem(STORAGE_KEY, name);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Приватный режим или отключённое хранилище — не повод ломать
    // переход к форме, выбор просто не переживёт перезагрузку.
  }
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function selectAppliance(name: ApplianceName): void {
  write(name);
}

export function clearSelectedAppliance(): void {
  write(null);
}

/** Подписка для useSyncExternalStore. */
export function subscribeToAppliance(onChange: () => void): () => void {
  window.addEventListener(EVENT_NAME, onChange);
  return () => window.removeEventListener(EVENT_NAME, onChange);
}

/** Снапшот для useSyncExternalStore. Возвращает строку или null —
    примитивы, поэтому лишних перерисовок от новой ссылки не будет. */
export function getSelectedAppliance(): ApplianceName | null {
  try {
    return (sessionStorage.getItem(STORAGE_KEY) as ApplianceName) || null;
  } catch {
    return null;
  }
}

/** На сервере sessionStorage нет — при рендере плашки ещё не видно,
    она появляется после гидратации. */
export function getSelectedApplianceOnServer(): ApplianceName | null {
  return null;
}
