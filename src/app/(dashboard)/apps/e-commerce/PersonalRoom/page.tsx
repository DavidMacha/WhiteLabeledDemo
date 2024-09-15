"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import MeetingTypeList from "components/MeetingTypeList";
import { useGetCallById } from "hooks/useGetCallById";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import styles from './PersonalRoom.module.css'; // Import the CSS module

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={styles.tableItem}>
      <h1 className={styles.tableTitle}>{title}:</h1>
      <h1 className={styles.tableDescription}>{description}</h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className={styles.container}>
      <h1 className={`${styles.heading} ${styles.headingLg}`}>
        Personal Meeting Room
      </h1>
      <div className={styles.tableContainer}>
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.buttonStart} onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className={styles.buttonCopy}
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
      <h1 className={`${styles.heading} ${styles.headingLg}`}>
        Meeting Menu
      </h1>
      <MeetingTypeList />
    </section>
    
  );
};

export default PersonalRoom;




/*
_____________________________ ORIGINAL _______________________-
// PROJECT IMPORTS
import Products from 'views/apps/Products';

// ==============================|| ECOMMERCE - PRODUCTS ||============================== //

const ProductsPage = () => {
  return <Products />;
};

export default ProductsPage;
*/