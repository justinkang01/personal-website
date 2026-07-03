export default function EasterEggTrigger() {
  return (
    <span
      onClick={() => console.log('Easter egg triggered — TODO: implement game')}
      style={{
        position: 'fixed',
        bottom: 8,
        right: 8,
        width: 8,
        height: 8,
        opacity: 0,
        cursor: 'default',
      }}
      aria-hidden="true"
    />
  );
}
