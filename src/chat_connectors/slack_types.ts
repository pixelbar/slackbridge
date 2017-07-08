declare module slack_payload {

    export interface IPrefs {
        highlight_words: string;
        user_colors: string;
        color_names_in_list: boolean;
        growls_enabled: boolean;
        tz?: any;
        push_dm_alert: boolean;
        push_mention_alert: boolean;
        push_everything: boolean;
        push_show_preview: boolean;
        push_idle_wait: number;
        push_sound: string;
        push_loud_channels: string;
        push_mention_channels: string;
        push_loud_channels_set: string;
        threads_everything: boolean;
        email_alerts: string;
        email_alerts_sleep_until: number;
        email_misc: boolean;
        email_weekly: boolean;
        welcome_message_hidden: boolean;
        all_channels_loud: boolean;
        loud_channels: string;
        never_channels: string;
        loud_channels_set: string;
        search_sort: string;
        expand_inline_imgs: boolean;
        expand_internal_inline_imgs: boolean;
        expand_snippets: boolean;
        posts_formatting_guide: boolean;
        seen_welcome_2: boolean;
        seen_ssb_prompt: boolean;
        spaces_new_xp_banner_dismissed: boolean;
        search_only_my_channels: boolean;
        search_only_current_team: boolean;
        emoji_mode: string;
        emoji_use: string;
        has_invited: boolean;
        has_uploaded: boolean;
        has_created_channel: boolean;
        has_searched: boolean;
        search_exclude_channels: string;
        messages_theme: string;
        webapp_spellcheck: boolean;
        no_joined_overlays: boolean;
        no_created_overlays: boolean;
        dropbox_enabled: boolean;
        seen_domain_invite_reminder: boolean;
        seen_member_invite_reminder: boolean;
        mute_sounds: boolean;
        arrow_history: boolean;
        tab_ui_return_selects: boolean;
        obey_inline_img_limit: boolean;
        new_msg_snd: string;
        require_at: boolean;
        ssb_space_window: string;
        mac_ssb_bounce: string;
        mac_ssb_bullet: boolean;
        expand_non_media_attachments: boolean;
        show_typing: boolean;
        pagekeys_handled: boolean;
        last_snippet_type: string;
        display_real_names_override: number;
        display_display_names: boolean;
        time24: boolean;
        enter_is_special_in_tbt: boolean;
        graphic_emoticons: boolean;
        convert_emoticons: boolean;
        ss_emojis: boolean;
        seen_onboarding_start: boolean;
        onboarding_cancelled: boolean;
        seen_onboarding_slackbot_conversation: boolean;
        seen_onboarding_channels: boolean;
        seen_onboarding_direct_messages: boolean;
        seen_onboarding_invites: boolean;
        seen_onboarding_search: boolean;
        seen_onboarding_recent_mentions: boolean;
        seen_onboarding_starred_items: boolean;
        seen_onboarding_private_groups: boolean;
        onboarding_slackbot_conversation_step: number;
        dnd_enabled: boolean;
        dnd_start_hour: string;
        dnd_end_hour: string;
        sidebar_behavior: string;
        channel_sort: string;
        separate_private_channels: boolean;
        separate_shared_channels: boolean;
        sidebar_theme: string;
        sidebar_theme_custom_values: string;
        no_invites_widget_in_sidebar: boolean;
        no_omnibox_in_channels: boolean;
        k_key_omnibox_auto_hide_count: number;
        mark_msgs_read_immediately: boolean;
        start_scroll_at_oldest: boolean;
        snippet_editor_wrap_long_lines: boolean;
        ls_disabled: boolean;
        f_key_search: boolean;
        k_key_omnibox: boolean;
        at_channel_suppressed_channels: string;
        push_at_channel_suppressed_channels: string;
        prompted_for_email_disabling: boolean;
        full_text_extracts: boolean;
        no_text_in_notifications: boolean;
        muted_channels: string;
        no_macelectron_banner: boolean;
        no_macssb1_banner: boolean;
        no_macssb2_banner: boolean;
        no_winssb1_banner: boolean;
        prev_next_btn: boolean;
        hide_user_group_info_pane: boolean;
        mentions_exclude_at_user_groups: boolean;
        privacy_policy_seen: boolean;
        enterprise_migration_seen: boolean;
        last_tos_acknowledged?: any;
        search_exclude_bots: boolean;
        load_lato_2: boolean;
        fuller_timestamps: boolean;
        last_seen_at_channel_warning: number;
        msg_preview: boolean;
        msg_preview_persistent: boolean;
        emoji_autocomplete_big: boolean;
        winssb_run_from_tray: boolean;
        winssb_window_flash_behavior: string;
        two_factor_auth_enabled: boolean;
        two_factor_type?: any;
        two_factor_backup_type?: any;
        hide_hex_swatch: boolean;
        show_jumper_scores: boolean;
        allow_calls_to_set_current_status: boolean;
        enterprise_mdm_custom_msg: string;
        client_logs_pri: string;
        enhanced_debugging: boolean;
        flannel_server_pool: string;
        mentions_exclude_at_channels: boolean;
        confirm_clear_all_unreads: boolean;
        confirm_user_marked_away: boolean;
        box_enabled: boolean;
        seen_single_emoji_msg: boolean;
        confirm_sh_call_start: boolean;
        preferred_skin_tone: string;
        show_all_skin_tones: boolean;
        whats_new_read: number;
        frecency_jumper: string;
        frecency_ent_jumper: string;
        jumbomoji: boolean;
        newxp_seen_last_message: number;
        show_memory_instrument: boolean;
        enable_unread_view: boolean;
        seen_unread_view_coachmark: boolean;
        seen_calls_video_beta_coachmark: boolean;
        seen_calls_video_ga_coachmark: boolean;
        seen_calls_ss_main_coachmark: boolean;
        seen_calls_ss_window_coachmark: boolean;
        measure_css_usage: boolean;
        enable_react_emoji_picker: boolean;
        seen_replies_coachmark: boolean;
        seen_custom_status_badge: boolean;
        seen_custom_status_callout: boolean;
        seen_guest_admin_slackbot_announcement: boolean;
        seen_threads_notification_banner: boolean;
        all_unreads_sort_order: boolean;
        locale: string;
        seen_intl_channel_names_coachmark: boolean;
        gdrive_authed: boolean;
        gdrive_enabled: boolean;
        seen_gdrive_coachmark: boolean;
        overloaded_message_enabled: boolean;
        seen_highlights_coachmark: boolean;
        seen_highlights_arrows_coachmark: boolean;
        seen_highlights_warm_welcome: boolean;
        a11y_font_size: string;
        a11y_animations: boolean;
        growth_msg_limit_approaching_cta_count: number;
        growth_msg_limit_approaching_cta_ts: number;
        growth_msg_limit_reached_cta_count: number;
        growth_msg_limit_reached_cta_last_ts: number;
        growth_msg_limit_long_reached_cta_count: number;
        growth_msg_limit_long_reached_cta_last_ts: number;
        intro_to_apps_message_seen: boolean;
        all_notifications_prefs?: any;
    }

    export interface ISelf {
        id: string;
        name: string;
        prefs: IPrefs;
        created: number;
        manual_presence: string;
    }

    export interface IList {
        name: string;
        title: string;
    }

    export interface ITeamHandyRxns {
        restrict: boolean;
        list: IList[];
    }

    export interface IWhoCanManageSharedChannels {
        type: string[];
    }

    export interface IWhoCanPostInSharedChannels {
        type: string[];
    }

    export interface IEnterpriseTeamCreationRequest {
        is_enabled: boolean;
    }

    export interface IWhoCanManageIntegrations {
        type: string[];
    }

    export interface IPrefs2 {
        default_channels: string[];
        gateway_allow_xmpp_ssl: number;
        gateway_allow_irc_ssl: number;
        gateway_allow_irc_plain: number;
        posts_migrating: number;
        allow_calls: boolean;
        limit_reached_ts: number;
        locale: string;
        hide_referers: boolean;
        msg_edit_window_mins: number;
        allow_message_deletion: boolean;
        calling_app_name: string;
        display_real_names: boolean;
        who_can_at_everyone: string;
        who_can_at_channel: string;
        who_can_create_channels: string;
        who_can_archive_channels: string;
        who_can_create_groups: string;
        who_can_post_general: string;
        who_can_kick_channels: string;
        who_can_kick_groups: string;
        retention_type: number;
        retention_duration: number;
        group_retention_type: number;
        group_retention_duration: number;
        dm_retention_type: number;
        dm_retention_duration: number;
        file_retention_duration: number;
        file_retention_type: number;
        allow_retention_override: boolean;
        require_at_for_mention: boolean;
        default_rxns: string[];
        team_handy_rxns: ITeamHandyRxns;
        channel_handy_rxns?: any;
        compliance_export_start: number;
        warn_before_at_channel: string;
        disallow_public_file_urls: boolean;
        who_can_create_delete_user_groups: string;
        who_can_edit_user_groups: string;
        who_can_change_team_profile: string;
        display_email_addresses: boolean;
        who_has_team_visibility: string;
        invites_only_admins: boolean;
        disable_file_uploads: string;
        disable_file_editing: boolean;
        disable_file_deleting: boolean;
        uses_customized_custom_status_presets: boolean;
        who_can_create_shared_channels: string;
        who_can_manage_shared_channels: IWhoCanManageSharedChannels;
        who_can_post_in_shared_channels: IWhoCanPostInSharedChannels;
        allow_shared_channel_perms_override: boolean;
        gdrive_enabled_team: boolean;
        enterprise_team_creation_request: IEnterpriseTeamCreationRequest;
        enterprise_default_channels: any[];
        enterprise_mandatory_channels: any[];
        enterprise_mdm_level: number;
        enterprise_mdm_date_enabled: number;
        loud_channel_mentions_limit: number;
        show_join_leave: boolean;
        dnd_enabled: boolean;
        dnd_start_hour: string;
        dnd_end_hour: string;
        custom_status_presets: string[][];
        custom_status_default_emoji: string;
        auth_mode: string;
        who_can_manage_integrations: IWhoCanManageIntegrations;
        discoverable: string;
        invites_limit: boolean;
    }

    export interface Icon {
        image_34: string;
        image_44: string;
        image_68: string;
        image_88: string;
        image_102: string;
        image_132: string;
        image_original: string;
        image_230: string;
    }

    export interface ITeam {
        id: string;
        name: string;
        email_domain: string;
        domain: string;
        msg_edit_window_mins: number;
        prefs: IPrefs2;
        icon: Icon;
        over_storage_limit: boolean;
        approaching_msg_limit: boolean;
        messages_count: number;
        plan: string;
        avatar_base_url: string;
        over_integrations_limit: boolean;
    }

    export interface ILatest {
        text: string;
        username: string;
        bot_id: string;
        type: string;
        subtype: string;
        ts: string;
        user: string;
    }

    export interface ITopic {
        value: string;
        creator: string;
        last_set: number;
    }

    export interface IPurpose {
        value: string;
        creator: string;
        last_set: number;
    }

    export interface IChannel {
        id: string;
        name: string;
        is_channel: boolean;
        created: number;
        creator: string;
        is_archived: boolean;
        is_general: boolean;
        name_normalized: string;
        is_shared: boolean;
        is_org_shared: boolean;
        has_pins: boolean;
        is_member: boolean;
        previous_names: string[];
        last_read: string;
        latest: ILatest;
        unread_count?: number;
        unread_count_display?: number;
        members: string[];
        topic: ITopic;
        purpose: IPurpose;
    }

    export interface Im {
        id: string;
        created: number;
        is_im: boolean;
        is_org_shared: boolean;
        user: string;
        has_pins: boolean;
        last_read: string;
        latest?: any;
        unread_count: number;
        unread_count_display: number;
        is_open: boolean;
    }

    export interface ISubteams {
        self: any[];
        all: any[];
    }

    export interface IDnd {
        dnd_enabled: boolean;
        next_dnd_start_ts: number;
        next_dnd_end_ts: number;
        snooze_enabled: boolean;
    }

    export interface IProfile {
        first_name: string;
        last_name: string;
        avatar_hash: string;
        real_name: string;
        real_name_normalized: string;
        email: string;
        image_24: string;
        image_32: string;
        image_48: string;
        image_72: string;
        image_192: string;
        image_512: string;
        fields: any;
        status_text: string;
        status_emoji: string;
        bot_id: string;
        api_app_id: string;
        always_active?: boolean;
        image_1024: string;
        image_original: string;
        title: string;
        phone: string;
        skype: string;
    }

    export interface IUser {
        id: string;
        team_id: string;
        name: string;
        deleted: boolean;
        color: string;
        real_name: string;
        tz: string;
        tz_label: string;
        tz_offset: number;
        profile: IProfile;
        is_admin: boolean;
        is_owner: boolean;
        is_primary_owner: boolean;
        is_restricted: boolean;
        is_ultra_restricted: boolean;
        is_bot: boolean;
        updated: number;
        presence: string;
    }

    export interface Icons {
        image_36: string;
        image_48: string;
        image_72: string;
        emoji: string;
        image_64: string;
    }

    export interface IBot {
        id: string;
        deleted: boolean;
        name: string;
        updated: number;
        app_id: string;
        icons: Icons;
    }

    export interface IRootObject {
        ok: boolean;
        self: ISelf;
        team: ITeam;
        latest_event_ts: string;
        channels: IChannel[];
        groups: any[];
        ims: Im[];
        cache_ts: number;
        read_only_channels: any[];
        can_manage_shared_channels: boolean;
        subteams: ISubteams;
        dnd: IDnd;
        users: IUser[];
        cache_version: string;
        cache_ts_version: string;
        bots: IBot[];
        url: string;
    }

}

declare module slack_message {

    export interface Icons {
        emoji: string;
        image_64: string;
    }

    export interface Icons2 {
        emoji: string;
        image_64: string;
    }

    export interface IAttachment {
        service_name: string;
        service_url: string;
        title: string;
        title_link: string;
        author_name: string;
        author_link: string;
        thumb_url: string;
        thumb_width: number;
        thumb_height: number;
        fallback: string;
        video_html: string;
        video_html_width: number;
        video_html_height: number;
        from_url: string;
        service_icon: string;
        id: number;
    }

    export interface IMessage {
        text: string;
        username: string;
        bot_id: string;
        icons: Icons2;
        attachments: IAttachment[];
        type: string;
        subtype: string;
        ts: string;
    }

    export interface Icons3 {
        emoji: string;
        image_64: string;
    }

    export interface IPreviousMessage {
        text: string;
        username: string;
        bot_id: string;
        icons: Icons3;
        type: string;
        subtype: string;
        ts: string;
    }

    export interface IRootObject {
        type: string;
        channel: string;
        user: string;
        text: string;
        ts: string;
        source_team: string;
        team: string;
        username: string;
        bot_id: string;
        subtype: string;
        event_ts: string;
        icons: Icons;
        message: IMessage;
        hidden?: boolean;
        previous_message: IPreviousMessage;
    }

}

