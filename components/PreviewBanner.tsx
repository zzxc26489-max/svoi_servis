export default function PreviewBanner() {
  if (process.env.NEXT_PUBLIC_PREVIEW !== "true") {
    return null;
  }

  return (
    <div className="bg-amber-400 px-4 py-2 text-center text-sm font-medium text-amber-950">
      🚧 Предпросмотр сайта в разработке. Форма заявок здесь не отправляет
      данные — заработает после переезда на постоянный хостинг.
    </div>
  );
}
