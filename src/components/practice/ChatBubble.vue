<!-- 聊天气泡chat bubble -->
<template>
  <div class="chat-bubble" :class="side">
    <div class="avatar">
      <slot name="avatar">
        <img src="" alt="avatar" @error="imgErr" />
      </slot>
    </div>
    <div class="detail">
      <div class="top">
        <span class="name">
          {{ from }}
        </span>
        <!-- <span class="time">
          {{ data.timestamp | timeFilter }}
        </span> -->
      </div>
      <div class="bubble">
        <slot>
          <div>{{ data.message || '' }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import defaultAvatar from '@/assets/images/default_avatar.jpg';

export default defineComponent({
  components: {},
  filters: {
    timeFilter(val) {
      return new Date(val).toLocaleString();
    },
  },
  props: {
    side: {
      type: String,
      default: 'right',
    },
    data: {
      type: Object,
      default() {
        return {
          userInfo: {
            avatar: '',
            userName: '',
          },
          timestamp: '',
          content: '',
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    from() {
      const { from } = this.data;
      if (!from) return '';
      return from.userName;
    },
  },
  watch: {},
  methods: {
    imgErr(e) {
      const el = e.srcElement;
      // el.src = '/default_avatar.jpg';
      el.src = defaultAvatar;
    },
  },
});
</script>
<style lang="scss">
.chat-bubble {
  display: flex;
  align-items: flex-start;
  padding: 0 10px;
  margin-top: 10px;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  &.right {
    flex-direction: row-reverse;
    .detail {
      align-items: flex-end;
      .bubble {
        border-top-left-radius: 10px;
        border-top-right-radius: 0;
      }
    }
    .top {
      flex-direction: row-reverse;
    }
  }
  .avatar {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 40%;
    margin: 0 20px;
    .top {
      display: flex;
      .name {
        margin: 0 10px;
      }
    }
    .bubble {
      padding: 10px;
      word-break: break-all;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #ccc;
      border-radius: 10px;
      border-top-left-radius: 0;
    }
  }
}
</style>
