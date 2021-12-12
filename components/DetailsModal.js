const DetailsModal = () => {
  return (
    <div
    className="
      z-[60]
      bg-black bg-opacity-60
      top-0
      fixed
      h-screen
      w-full
      overflow-y-scroll
    "
    onClick={handleCloseClick}
  >
    <div className="info-container">

    <video id="video" className="video-js" />

      <details-modal-skeleton v-if="isLoading" />

      <div v-else>
        <div className="relative w-full h-[30rem]">
          <Image
            src={data.details.backdrop_path}
            alt="info banner"
            className="w-full h-full object-cover"
          />

          <circle-button
            className="z-50 absolute top-5 right-5 bg-background text-white"
            onClick={handleCloseClick}
          >
            <IconCross className="text-lg" />
          </circle-button>

          <div className="info__overlay">
            <h1 className="text-2xl font-netflix_medium mb-6">
              {{ data.details.title || data.details.name }}
            </h1>

            <div className="flex items-center space-x-2">
              <Button className="bg-white text-black" onClick={handlePlayClick}>
                <IconPlayFill className="text-lg" />
                <p>Play</p>
              </Button>
              <circle-button>
                <IconPlus className="text-lg" />
              </circle-button>
              <circle-button>
                <IconThumbUp className="text-lg" />
              </circle-button>
              <circle-button>
                <IconThumbDown className="text-lg" />
              </circle-button>
            </div>
          </div>
        </div>

        <div className="space-y-8 px-4 md:px-12 my-3">
          <div className="md:space-x-8 flex flex-col md:flex-row space-y-4">
            <div className="flex-1 flex-grow-[2] space-y-4">
              {/* <p className="text-base text-gray-300">{{ data.details.tagline }}</p> */}
              <p className="text-base text-gray-300">this is detail</p>

              <div className="flex items-center space-x-2">
                <div className="flex items-center text-yellow-500">
                  <IconStar />
                  {/* <p>{{ data.details.vote_average.toFixed(1) }}</p> */}
                  <p>vote</p>
                </div>

                <p>
                  {/* {{ data.details.release_date || data.details.first_air_date }} */}
                  release date
                </p>

                <p
                  v-if="data.details.adult"
                  className="border border-gray-500 px-2"
                >
                  18+
                </p>
              </div>

              <p className="text-base">
                {/* {{ data.details.overview }} */}
                overview
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex-1 space-y-2 text-sm">
              <div className="space-x-2">
                <span className="text-gray-400">Genres:</span>
                <span className="text-white">
                  {/* {{ data.details.genres.map(({ name }) => name).join(", ") }} */}
                  genres
                </span>
              </div>

              <div className="space-x-2">
                <span className="text-gray-400">Companies:</span>
                <span className="text-white">
                  {/* {{
                    data.details.production_companies
                      .map(({ name }) => name)
                      .join(", ")
                  }} */}
                  {{
                    company
                  }}
                </span>
              </div>

              <div className="space-x-2">
                <span className="text-gray-400">Countries:</span>
                <span className="text-white">
                  {/* {{
                    data.details.production_countries
                      .map(({ name }) => name)
                      .join(", ")
                  }} */}
                  {{
                    countries
                  }}
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-netflix_medium">More like this</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <poster-card
              className="col-span-1"
              :data="card"
              v-for="card in data.similars.results"
              :key="card.id"
            /> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DetailsModal;

import IconPlayFill from "~icons/ph/play-fill";
import IconPlus from "~icons/ic/outline-plus";
import IconThumbUp from "~icons/fluent/thumb-like-20-regular";
import IconThumbDown from "~icons/fluent/thumb-dislike-24-regular";
import IconCross from "~icons/akar-icons/cross";
import IconStar from "~icons/ic/sharp-star-purple500";

import PosterCard from "./PosterCard.vue";
import Button from "./Button.vue";
import CircleButton from "./CircleButton.vue";
import Image from "./Image.vue";

import DetailsModalSkeleton from "../skeletons/DetailsModalSkeleton.vue";

import useMovieDetails from "../hooks/useMovieDetails";
import useTVDetails from "../hooks/useTVDetails";
import { state, setModalActive, setIsPlaying } from "../store";

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const useFetch = {
  tv: useTVDetails,
  movies: useMovieDetails,
};

export default {
  setup() {
    let played = false;
    const { id, type = "movies" } = state.modalData;
    const [data, isLoading, isError] = useFetch[type](id);
    return {
      data,
      isLoading,
      isError,
    };
  },
  components: {
    Image,
    CircleButton,
    IconPlayFill,
    IconPlus,
    IconThumbUp,
    IconThumbDown,
    IconCross,
    IconStar,
    Button,
    PosterCard,
    DetailsModalSkeleton,
  },
  methods: {
    handleCloseClick() {
      setModalActive(false);
    },
    handlePlayClick() {
      setIsPlaying()
      console.log(state)
    },
  },
  mounted() {
		const element = document.getElementById('video');
		videojs(element, {
			autoplay: true,
        controls: true,
        fluid: true,
        aspectRatio: "16:9",
        fill: true,
			sources: [
				{
					src: 'https://vd8.kanzy3.com/20211126/0NTrCHyR/index.m3u8',
					type: 'application/x-mpegURL',
				},
			],
		});
	},
};
