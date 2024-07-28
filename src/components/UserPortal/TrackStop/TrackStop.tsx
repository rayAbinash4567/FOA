const TrackCheckpoint = ({ id, name, iconUrl, description, isLast }) => {
  console.log('Rendering checkpoint:', name, iconUrl); // This will log to the console

  return (
    <div className="flex flex-col items-center">
      <img src={iconUrl} alt={name} className="w-16 h-16 mb-2" />
      <span className="text-sm font-semibold">{name}</span>
      <p className="text-xs text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default TrackCheckpoint;
