type ServiceBlobsProps = {
  /** Right sits high; left sits low (use on the section above FAQ). */
  side: "left" | "right";
};

export default function ServiceBlobs({ side }: ServiceBlobsProps) {
  return (
    <div className={`service-blob service-blob--${side}`} aria-hidden="true" />
  );
}
