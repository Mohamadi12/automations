import { Button } from "@/components/ui/button";
import {
  useQueryAutomation,
  useQueryAutomationPosts,
} from "@/hooks/user-queries";
import React from "react";
import Loader from "../../loader";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import TriggerButton from "../trigger-button";
import { useAutomationPosts } from "@/hooks/use-automation";
import { InstagramPostProps } from "@/types/posts.type";

type Props = {
  id: string;
};

const PostButton = ({ id }: Props) => {
  const { data } = useQueryAutomationPosts();
  const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id);

  return (
    <TriggerButton label="Attach a post">
      {data?.status === 200 ? (
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex flex-wrap w-full gap-3">
            {data.data.data.map((post: InstagramPostProps) => (
              <div
                className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                key={post.id}
                onClick={() =>
                  onSelectPost({
                    postid: post.id,
                    media: post.media_url,
                    mediaType: post.media_type,
                    caption: post.caption,
                  })
                }
              >
                {posts.find((p) => p.postid === post.id) && (
                  <CheckCircle
                    fill="white"
                    stroke="black"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  />
                )}
                <Image
                  fill
                  sizes="100vw"
                  src={post.media_url}
                  alt="post image"
                  className={cn(
                    "hover:opacity-75 transition duration-100",
                    posts.find((p) => p.postid === post.id) && "opacity-75"
                  )}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={mutate}
            disabled={posts.length === 0}
            className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
          >
            <Loader state={isPending}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <p className="text-text-secondary text-center">No posts found!</p>
      )}
    </TriggerButton>
  );
};

export default PostButton;

// Le composant PostButton est utilisé pour afficher et gérer les publications Instagram associées à une automatisation.
// useQueryAutomationPosts : Un hook personnalisé pour récupérer les publications Instagram.
// useAutomationPosts : Un hook personnalisé pour gérer les publications sélectionnées.
// InstagramPostProps : Un type pour représenter les propriétés d'une publication Instagram.
// Props :
// id : Identifiant unique de l'automatisation.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryAutomationPosts() pour récupérer les publications Instagram.
// useAutomationPosts(id) est utilisé pour obtenir les fonctions et les états nécessaires pour gérer les publications sélectionnées.
// Affichage Conditionnel :
// Si les publications sont récupérées avec succès (data?.status === 200), le composant affiche les publications sous forme de vignettes.
// Les publications sélectionnées sont marquées avec une icône CheckCircle.
// Un bouton "Attach Post" est affiché pour enregistrer les publications sélectionnées, avec un indicateur de chargement si une opération est en cours.
// Gestion des Publications :
// Les publications peuvent être sélectionnées ou désélectionnées en cliquant sur elles.
// Le bouton "Attach Post" est désactivé si aucune publication n'est sélectionnée.
